import { useState } from 'react';

export default function SnippetsPanel() {
    const [snippets, setSnippets] = useState([
        {
            id: 1,
            content: `User::first();`
        },
        {
            id: 2,
            content: `foreach (range(1, 10) as $item) {
            echo $item;
            }`
        },
        {
            id: 3,
            content: `clgt`
        }
    ])

    const [previewCode, setPreviewCode] = useState();

    const deleteSnippet = function (id) {
        setSnippets(snippets.filter((snippet) => id !== snippet.id));
    }

    const randomSnippet = function () {
        const foo = { id: (new Date()).getTime(), content: 'this is ' + (new Date()).toString() };
        setSnippets([...snippets, foo]);
    }

    const setSnippetToInput = function (code) {
        // set current input content with snippet code
    }

    return (
        <div style={{ minWidth: '500px' }}>

            <button button className="border border-gray-500 text-blue-500 rounded" type="button" onClick={randomSnippet} > Random</button>

            <div className="w-full flex gap-x-10">
                {/* list snippet */}
                <div className="w-full h-full flex flex-col gap-y-2 overflow-auto">
                    {snippets.map(function (snippet, index) {
                        return (
                            <div key={snippet.id} className="w-96 relative cursor-pointer">
                                <textarea
                                    onMouseOver={() => setPreviewCode(snippet.content)}
                                    onClick={() => setSnippetToInput(snippet.content)}
                                    className="p-2 rounded w-full h-20 overflow-y-auto bg-gray-300 border-2 hover:border-cyan-500 focus:outline-none focus:border-cyan-500" defaultValue={snippet.content} />
                                <button
                                    className="absolute right-2 top-2"
                                    tabIndex="-1"
                                    type="button"
                                    onClick={() => deleteSnippet(snippet.id)}>
                                    <DeleteIcon />
                                </button>
                            </div>
                        )
                    })}
                </div>

                {/* preview panel */}
                <div>
                    <textarea
                        tabIndex="-1"
                        className="p-2 rounded w-96 h-64 overflow-y-auto"
                        defaultValue={previewCode}></textarea>
                </div>
            </div>


        </div>
    );
}

function DeleteIcon() {
    return (
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
    )
}