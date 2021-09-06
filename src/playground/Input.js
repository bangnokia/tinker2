import { useLoading } from '../contexts/PlaygroundContext';
import Editor from "@monaco-editor/react";
import { useMonaco } from '@monaco-editor/react';
import { useState, useRef, useCallback, useEffect } from "react";
import { registerPHPSnippetLanguage } from '../utils/registerPHPSnippetLanguage';
import execute from "../executor";

export default function Input({ setOutput, appendOutput, cleanOutput, project, editorOptions }) {
    const [, setLoading] = useLoading()
    const [code,] = useState("// Press Ctr/Cmd + Enter to run code \necho 'Welcome to Tinker 2'")
    const monaco = useMonaco()

    let editorRef = useRef(null);

    const runCode = useCallback(async () => {
        setLoading(true)

        const command = await execute({ code: editorRef.current.getValue(), project })

        cleanOutput()

        command.on('error', error => console.log('error') && setOutput(error))
        command.stdout.on('data', line => {
            console.log('stdout ', line);
            appendOutput(line)
        })
        command.stderr.on('data', line => {
            console.log('stderr ', line)
        })
        command.on('close', () => setLoading(false))

        command.spawn();
        // .then(({ stdout }) => {
        //     console.log('stdout', stdout)
        //     try {
        //         const result = JSON.parse(stdout.trim())
        //         console.log(result)
        //         setOutput(result.output)
        //     } catch (ex) {
        //         console.log('ex', ex)
        //         setOutput(stdout.trim())
        //     }
        // })
        // .finally(() => setLoading(false))
    }, [appendOutput, cleanOutput, project, setLoading, setOutput])

    useEffect(() => {
        if (monaco) {
            registerPHPSnippetLanguage(monaco.languages)

            if (editorRef.current) {
                editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode)
            }
        }
    }, [monaco, runCode])

    useEffect(() => {
        // The play button on the sidebar
        document.getElementById('play-code-button').addEventListener('click', runCode)
    }, [runCode])

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
