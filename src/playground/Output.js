import Editor from "@monaco-editor/react"
import { usePlayground } from '../contexts/PlaygroundContext';

export default function Output({ editorOptions }) {
    const { output } = usePlayground()

    return (
        <>
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
                />
            </div>
        </>
    )
}
