import { useLoading } from '../contexts/PlaygroundContext';
import Editor from "@monaco-editor/react";
import { useMonaco } from '@monaco-editor/react';
import { useState, useRef, useCallback, useEffect } from "react";
import { registerPHPSnippetLanguage } from '../utils/registerPHPSnippetLanguage';
import execute from "../executor";
import { initVimMode } from 'monaco-vim';

export default function Input({ setOutput, project, editorOptions }) {
    const [loading, setLoading] = useLoading()
    const [code,] = useState("// Press Ctr/Cmd + Enter to run code\n// If you can't typing, press 'i'\necho 'Welcome to Tinker 2'")
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

                initVimMode(editorRef.current, document.getElementById("editor-status-bar"))
            }
        }
    }, [monaco, runCode])

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        const opts = monaco.editor.EditorOption;
        // fake the config of adapter
        editorRef.current.getConfiguration = function () {
            return {
                readOnly: false,
                viewInfo: {
                    cursorWidth: editor.getOption(opts.cursorWidth),
                },
                fontInfo: editor.getOption(opts.fontInfo),
            }
        }

        setTimeout(() => monaco.editor.remeasureFonts(), 322);
    }

    return (
        <>
            <Editor
                key="tinker-pad"
                theme="vs-dark"
                language="php-snippet"
                value={code}
                // onChange={(value) => setCode(value)}
                onMount={handleEditorDidMount}
                options={editorOptions}
            />
            <button
                type="button"
                onClick={runCode}
                className={'absolute top-1 -left-12 text-gray-500 hover:text-cyan-500 ' + (loading ? 'animate-spin text-cyan-500' : '')}>
                <PlayIcon />
            </button>
        </>
    )
}


function PlayIcon() {
    return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )
}