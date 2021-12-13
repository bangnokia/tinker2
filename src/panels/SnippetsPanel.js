import { useState } from 'react';
import { useSnippets } from '../hooks/useSnippets';

export default function SnippetsPanel({ closePanel }) {
    const { snippets, deleteSnippet, setCurrentSnippet } = useSnippets();
    const [previewCode, setPreviewCode] = useState();

    const handleMouseOver = function (code) {
        setPreviewCode(code);
    }

    const setSnippetToInput = function (code) {
        // set current input content with snippet code
        setCurrentSnippet(code);
        closePanel();
    }

    return (
        <div style={{ minWidth: '500px' }} className="h-full overflow-scroll">

            {/* <button className="absolute top-0 right-0 border border-gray-500 text-gray-500 rounded" type="button" onClick={randomSnippet} > Random</button> */}
            {/* <div>
                <input className="form-input py-3 text-base max-w-lg block w-full form-control" type="text" placeholder="Search" />
            </div> */}

            <div className="flex gap-x-5 h-full overflow-y-scroll">

                {/* list snippet */}
                <div className="w-96 h-full flex flex-col gap-y-2 overflow-y-scroll p-2">
                    {snippets.map(function (snippet, index) {
                        return (
                            <div key={snippet.id} className="w-full relative cursor-pointer">
                                <textarea
                                    onMouseOver={() => handleMouseOver(snippet.content)}
                                    onClick={() => setSnippetToInput(snippet.content)}
                                    className="form-textarea max-w-full w-full h-20 form-control cursor-pointer" defaultValue={snippet.content} />
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
                <div class="flex items-start content-center justify-center p-2">
                    <textarea
                        tabIndex="-1"
                        className="form-textarea w-96 h-64 form-control"
                        value={previewCode}></textarea>
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