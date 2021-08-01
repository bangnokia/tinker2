import { useLoading } from '../contexts/PlaygroundContext';
import Editor from "@monaco-editor/react";
import { useMonaco } from '@monaco-editor/react';
import { useState, useRef, useCallback, useEffect } from "react";
import { registerPHPSnippetLanguage } from '../utils/registerPHPSnippetLanguage';
import execute from "../executor";

export default function Input({ setOutput, project, editorOptions }) {
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
