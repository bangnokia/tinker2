import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import execute from './executor';
import { uploadPsycho } from './executor';
import { useSettings } from './hooks/useSettings';
import Editor, { useMonaco } from "@monaco-editor/react"
import { registerPHPSnippetLanguage } from "./utils/registerPHPSnippetLanguage";

const editorOptions = {
    lineHeight: 32,
    fontSize: 16,
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
    const [output, setOutput] = useState('Press cmd + Enter to execute the code.')
    const [settings,] = useSettings()
    const layoutClasses = settings.layout === 'vertical' ? 'grid-cols-2 divide-x-2' : 'grid-cols-1 divide-y-2';

    useEffect(() => {
        if (project.type === 'ssh') {
            uploadPsycho(project).then(function () {
                console.log('uploaded psycho' + (new Date()).toString())
            })
        }
    }, [project])



    return (
        <PlaygroundProvider>
            <div
                className={`h-full grid divide-gray-800 transition transform ` + layoutClasses}>
                <div className="editor overflow-auto">
                    <Input {...{ setOutput, project }} />
                </div>

                <div className="result relative">
                    <Output output={output} />

                    <LoadingIndicator />
                </div>

            </div>
        </PlaygroundProvider>
    )
}

function LoadingIndicator() {
    const [loading,] = useLoading()
    const loadingClass = loading ? 'animate-spin' : 'hidden';
    return (
        <div className="absolute top-2 right-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class={`h-5 w-5 ` + loadingClass} viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
        </div>
    )
}

function Input({ setOutput, project }) {
    const [, setLoading] = useLoading()
    const [code, setCode] = useState("range(1, 10)")
    const monaco = useMonaco()
    const editorRef = useRef(null)




    useEffect(() => {
        if (monaco) {
            registerPHPSnippetLanguage(monaco.languages)
        }
        if (editorRef.current) {
            function runCode() {
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
            }

            editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, function () {
                console.log('run code')
                runCode()
            })
        }
    }, [monaco, editorRef, setLoading, project, setOutput])

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
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
                        wordWrap: 'off',
                        renderIndentGuides: false,
                        contextmenu: false,
                    }}
                />
            </div>
        </>
    )
}

export default Playground;