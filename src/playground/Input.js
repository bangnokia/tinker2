import { usePlayground } from '../contexts/PlaygroundContext';
import Editor from "@monaco-editor/react";
import { useMonaco } from '@monaco-editor/react';
import { useState, useRef, useEffect, useMemo } from "react";
import { registerPHPSnippetLanguage } from '../utils/registerPHPSnippetLanguage';
import { initVimMode } from 'monaco-vim';
import { useSettings } from './../hooks/useSettings';
import { useSnippets } from '../hooks/useSnippets';

export default function Input({ project, editorOptions, outputMode, increaseCount }) {
    const { loading, shouldRunCode, setShouldRunCode, runCode } = usePlayground()
    const [settings,] = useSettings()
    const [code,] = useState('')
    const monaco = useMonaco()
    const [, addSnippet,] = useSnippets();

    let editorRef = useRef(null);
    let vimModeRef = useRef(null);
    const inputEditorOptions = { ...editorOptions, ...{ contextmenu: true } }

    useEffect(() => {
        if (monaco) {
            registerPHPSnippetLanguage(monaco.languages)

            // set hotkeys for execute code
            if (editorRef.current) {
                console.log('set monaco action')
                editorRef.current.addCommand(
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
                    () => runCode(project, editorRef.current.getValue(), outputMode)
                )
                editorRef.current.focus();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monaco, outputMode])

    useEffect(() => {
        // add code to snippets context menu
        if (editorRef.current) {
            // react hot reload will dupplicates this action
            if (!editorRef.current.getAction('context-add-to-snippets')) {
                editorRef.current.addAction({
                    id: 'context-add-to-snippets',
                    label: 'Add to snippets',
                    keybindings: [],
                    precondition: null,
                    keybindingContext: null,
                    contextMenuGroupId: 'navigation',
                    contextMenuOrder: 1.5,
                    run: function (editor) {
                        console.log('code', editor.getValue())
                        addSnippet(editor.getValue())
                    }
                });
            }

            editorRef.current.focus();
        }
    }, [monaco, addSnippet])


    useEffect(() => {
        if (shouldRunCode) {
            setShouldRunCode(false)
            runCode(project, editorRef.current.getValue(), outputMode)
        }
    }, [outputMode, project, runCode, setShouldRunCode, shouldRunCode])

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
                options={inputEditorOptions}
            />

        </>
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, outputMode, project])
}
