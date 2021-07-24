import { useState, useEffect, useRef, createContext, useContext, useCallback, useLayoutEffect } from 'react';
import execute from './executor';
import { uploadPsycho } from './executor';
import { useSettings } from './hooks/useSettings';
import Editor, { useMonaco } from "@monaco-editor/react"
import { registerPHPSnippetLanguage } from "./utils/registerPHPSnippetLanguage";
import Split from 'split.js'

const editorOptions = {
    lineHeight: 32,
    fontSize: 15,
    smoothScrolling: true,
    wordWrap: 'on',
    renderLineHighlight: 'none',
    renderWhitespace: false,
    scrollbar: {
        verticalScrollbarSize: 0,
        verticalSliderSize: 10
    },
    semanticHighlighting: {
        enabled: true
    },
    minimap: {
        enabled: false
    }
}

const PlaygroundContext = createContext();

function useLoading() {
    const context = useContext(PlaygroundContext);

    if (!context) {
        throw new Error("useSettings must be use within a SettingsProvider.")
    }

    return context
}

function PlaygroundProvider(props) {
    const [loading, setLoading] = useState(false)

    return (
        <PlaygroundContext.Provider value={[loading, setLoading]} {...props} />
    )
}

function Playground({ project }) {
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
                <div className="pg-input overflow-auto">
                    <Input setOutput={setOutput} project={project} />
                </div>

                <div className="pg-output overflow-auto relative">
                    <Output output={output} />
                    <LoadingIndicator />
                </div>

            </div>
        </PlaygroundProvider>
    )
}

function Input({ setOutput, project }) {
    const [, setLoading] = useLoading()
    const [code,] = useState("// Press Ctr/Cmd + Enter to run code \necho 'Welcome to Tinker 2'")
    const monaco = useMonaco()
    let editorRef = useRef(null);

    const runCode = useCallback(() => {
        setLoading(true)
        execute({ code: editorRef.current.getValue(), project })
            .then(({ stdout }) => {
                try {
                    const result = JSON.parse(stdout.trim())
                    setOutput(result.output)
                } catch (ex) {
                    setOutput(stdout.trim())
                }
            })
            .finally(() => setLoading(false))
    }, [project, setLoading, setOutput])

    useEffect(() => {
        if (monaco) {
            registerPHPSnippetLanguage(monaco.languages)

            if (editorRef.current) {
                editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode)
            }
        }
    }, [monaco, runCode])

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode)
    }

    return (
        <Editor
            key="tinker-pad"
            theme="vs-dark"
            language="php-snippet"
            value={code}
            // onChange={(value) => setCode(value)}
            onMount={handleEditorDidMount}
            options={editorOptions}
        />
    )
}

function Output({ output }) {
    return (
        <>
            <div className="h-full">
                <Editor
                    key="output"
                    language="php-snippet"
                    theme="vs-dark"
                    value={output}
                    options={{
                        ...editorOptions,
                        readOnly: true,
                        wordWrap: 'on',
                        renderIndentGuides: false,
                        contextmenu: false,
                    }}
                />
            </div>
        </>
    )
}

function LoadingIndicator() {
    const [loading,] = useLoading()
    const loadingClass = loading ? 'animate-spin' : 'hidden';
    return (
        <div className="absolute top-2 right-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ` + loadingClass} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
        </div>
    )
}

export default Playground;