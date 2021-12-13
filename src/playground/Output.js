import Editor from "@monaco-editor/react"
import { usePlayground } from '../contexts/PlaygroundContext';
import { useRef, useEffect, useMemo } from "react";

export default function Output({ editorOptions, outputMode }) {
    const { output, } = usePlayground()
    const editorRef = useRef(null)

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
