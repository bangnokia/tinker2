import { usePlayground } from '../contexts/PlaygroundContext';
import Editor from "@monaco-editor/react";
import { useMonaco } from '@monaco-editor/react';
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { registerPHPSnippetLanguage } from '../utils/registerPHPSnippetLanguage';
import { initVimMode } from 'monaco-vim';
import { useSettings } from './../hooks/useSettings';

export default function Input({ project, editorOptions, outputMode }) {
    const { loading, executeCode, killProcess } = usePlayground()
    const [settings,] = useSettings();
    const [code,] = useState("")
    const monaco = useMonaco()

    let editorRef = useRef(null);
    let vimModeRef = useRef(null);

    const runCode = useCallback(() => {
        if (loading) {
            killProcess()
        } else {
            executeCode(project, editorRef.current.getValue(), outputMode)
        }
    }, [executeCode, killProcess, loading, project, outputMode])

    useEffect(() => {
        if (monaco) {
            registerPHPSnippetLanguage(monaco.languages)

            if (editorRef.current) {
                editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode)
                editorRef.current.focus();
            }
        }
    }, [monaco, runCode])

    useEffect(() => {
        if (editorRef.current) {

            if (settings.key_binding === 'vim') {
                const opts = monaco.editor.EditorOption;
                // fake the config of adapter
                editorRef.current.getConfiguration = function () {
                    return {
                        readOnly: false,
                        viewInfo: {
                            cursorWidth: editorRef.current.getOption(opts.cursorWidth),
                        },
                        fontInfo: editorRef.current.getOption(opts.fontInfo),
                    }
                }
                if (!vimModeRef.current) {
                    vimModeRef.current = initVimMode(editorRef.current, document.getElementById("editor-status-bar"))
                }
            } else {
                if (vimModeRef.current) {
                    vimModeRef.current.dispose();
                }
            }

        }
    }, [monaco, settings.key_binding])

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    return useMemo(() => {
        return <>
            <Editor
                key="tinker-pad"
                theme="vs-dark"
                language="php-snippet"
                value={code}
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, loading, outputMode])
}


function PlayIcon() {
    return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )
}
