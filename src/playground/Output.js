import Editor from "@monaco-editor/react"
import { usePlayground } from '../contexts/PlaygroundContext';
import { useRef, useEffect, useMemo } from "react";
import { useSnippets } from '../hooks/useSnippets';

export default function Output({ editorOptions, outputMode }) {
    const { output, setOutput } = usePlayground()
    const editorRef = useRef(null)
    const [snippets,] = useSnippets()

    setOutput(snippets.map(snippet => snippet.content).join('\n'))

    const handleEditorOnMount = function (editor, monaco) {
        editorRef.current = editor
    }

    useEffect(() => {
        if (outputMode === 'buffered' && editorRef.current) {
            editorRef.current.setScrollPosition({ scrollTop: 0 })
        }
    }, [outputMode]);

    return useMemo(() => {
        return (
            <div className="h-full">
                <Editor
                    key="output"
                    language="php-snippet"
                    theme="vs-dark"
                    value={output === null ? "// Press Ctr/Cmd + Enter to run code" : output}
                    options={{
                        ...editorOptions,
                        readOnly: true,
                        wordWrap: 'on',
                        renderIndentGuides: false,
                        contextmenu: false,
                    }}
                    onMount={handleEditorOnMount}
                />
            </div>
        )
    }, [editorOptions, output])
}
