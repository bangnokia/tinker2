import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { uploadPsycho } from './executor';
import { useSettings } from './hooks/useSettings';
import Split from 'split.js'
import { PlaygroundProvider, usePlayground } from './contexts/PlaygroundContext';
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

    const increaseCount = function() {
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
            uploadPsycho(project).then(function() {
                //console.log('uploaded psycho' + (new Date()).toString())
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

                <PlayButton />

                <div className="pg-input overflow-hidden">
                    <Input {...{ project, editorOptions, outputMode: settings.output_mode || 'buffered', increaseCount }} />
                </div>

                <div className="pg-output overflow-hidden relative">
                    <Output {...{ editorOptions, outputMode: settings.output_mode }} />
                </div>

            </div>
        </PlaygroundProvider>
    )
}

function PlayButton() {
    const { loading, setShouldRunCode } = usePlayground()

    return (
        <button
            type="button"
            onClick={() => setShouldRunCode(true)}
            className={'absolute top-1 -left-12 text-gray-500 hover:text-cyan-500 ' + (loading ? 'animate-spin text-cyan-500' : '')}>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

        </button>
    )
}
