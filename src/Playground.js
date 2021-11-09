import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { uploadPsycho } from './executor';
import { useSettings } from './hooks/useSettings';
import Split from 'split.js'
import { PlaygroundProvider } from './contexts/PlaygroundContext';
import Input from './playground/Input';
import Output from './playground/Output';
import editorOptions from './config/editor-options';
import { randomQuotes } from './services/random-quotes';
import { useLicense } from './hooks/useLicense';

export default function Playground({ project }) {
    const [settings,] = useSettings()
    const [license,] = useLicense()
    const [count, setCount] = useState(0); // count how many times user play code, for free users only
    const splitInstance = useRef(null)
    const layout = settings.layout === 'vertical' ? 'horizontal' : 'vertical'

    const increaseCount = function () {
        setCount(count + 1);
    }

    useEffect(() => {
        if (!license.is_valid && count === Math.round(3.22 * 10)) {
            alert(randomQuotes())
            setCount(0);
        }
    }, [count, license.is_valid]);

    useEffect(() => {
        if (project.type === 'ssh') {
            uploadPsycho(project).then(function () {
                console.log('uploaded psycho' + (new Date()).toString())
            })
        }
    }, [project])

    useLayoutEffect(() => {
        if (splitInstance.current) {
            splitInstance.current.destroy()
        }
        splitInstance.current = Split(['.pg-input', '.pg-output'], {
            direction: layout,
            gutterSize: 4
        })
    }, [layout])

    return (
        <PlaygroundProvider>
            <div className={`relative flex h-full w-full ` + (layout === 'vertical' ? 'flex-col' : '')}
                style={{ backgroundColor: 'rgb(23, 23, 23)' }}>

                <div className="pg-input overflow-hidden">
                    <Input {...{ project, editorOptions, outputMode: settings.output_mode || 'buffered', increaseCount }} />
                </div>

                <div className="pg-output overflow-hidden relative">
                    <Output {...{ editorOptions }} />
                </div>

            </div>
        </PlaygroundProvider>
    )
}
