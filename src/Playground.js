import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { uploadPsycho } from './executor';
import { useSettings } from './hooks/useSettings';
import Split from 'split.js'
import { PlaygroundProvider } from './contexts/PlaygroundContext';
import Input from './playground/Input';
import Output from './playground/Output';
import LoadingIndicator from './LoadingIndicator';

const editorOptions = {
    lineHeight: 32,
    fontSize: 15,
    smoothScrolling: true,
    wordWrap: 'on',
    renderLineHighlight: 'none',
    renderWhitespace: false,
    scrollbar: {
        verticalScrollbarSize: 0,
        verticalSliderSize: 0
    },
    semanticHighlighting: {
        enabled: true
    },
    minimap: {
        enabled: false
    }
}

export default function Playground({ project }) {
    const [output, setOutput] = useState('')
    const [settings,] = useSettings()
    const splitInstance = useRef(null)
    const layout = settings.layout === 'vertical' ? 'horizontal' : 'vertical'

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
            <div
                className={`flex h-full w-full ` + (layout === 'vertical' ? 'flex-col' : '')}
                style={{
                    backgroundColor: 'rgb(23, 23, 23)'
                }}>
                <div className="pg-input overflow-hidden">
                    <Input {...{ setOutput, project, editorOptions }} />
                </div>

                <div className="pg-output overflow-hidden relative">
                    <Output {...{ output, editorOptions }} />
                    <LoadingIndicator />
                </div>

            </div>
        </PlaygroundProvider>
    )
}
