import Editor from "@monaco-editor/react"

export default function Output({ output, editorOptions }) {
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