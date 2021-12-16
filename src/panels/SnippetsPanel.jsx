import { useState, useEffect, useRef } from 'react';
import { useSnippets } from '../hooks/useSnippets';

export default function SnippetsPanel({ closePanel }) {
    const { snippets, deleteSnippet, setCurrentSnippet } = useSnippets();
    const [previewCode, setPreviewCode] = useState();
    const [search, setSearch] = useState('')
    const [index, setIndex] = useState(0)
    const searchInputRef = useRef(null)

    const handleMouseOver = function(code) {
        setPreviewCode(code);
    }

    const setSnippetToInput = function(code) {
        // set current input content with snippet code
        setCurrentSnippet(code);
        closePanel();
    }

    const searchingSnippets = snippets.filter((s) => s.content.toLowerCase().indexOf(search.toLowerCase()) !== -1);

    const handleKeyDown = function(e) {
        switch (e.keyCode) {
            case 27: // esc
                closePanel();
                break;
            case 13: // enter
                setCurrentSnippet(searchingSnippets[index].content)
                closePanel();
                break;
            case 40: // keydown
                let nexIndex = index + 1;
                const length = searchingSnippets.length - 1;
                setIndex(nexIndex > length ? length : nexIndex)
                setPreviewCode(searchingSnippets[index].content)
                break;
            case 38: // keyup
                let prevIndex = index - 1;
                setIndex(prevIndex < 0 ? 0 : prevIndex)
                setPreviewCode(searchingSnippets[index].content)
                break;
            default:
        }
    }

    useEffect(() => {
        searchInputRef.current?.focus();
    }, [])

    useEffect(() => {
        setIndex(0);
    }, [search])

    return (
        <div style={{ minWidth: '500px' }} className="h-full overflow-scroll w-full h-full overflow-hidden flex flex-col gap-y-5">

            <div className="w-full px-2 pt-2">
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={searchInputRef}
                    className="form-input form-control w-full max-w-full bg-gray-200"
                    placeholder="Search snippet..."
                    id="search-input" />
            </div>

            <div className="flex gap-x-5 max-h-full overflow-y-scroll">
                {/* list snippet */}
                <div className="w-96 h-full flex flex-col gap-y-2 overflow-y-scroll p-2">
                    {searchingSnippets.map(function(snippet, i) {
                        return (
                            <div key={snippet.id} className="w-full relative cursor-pointer">
                                <textarea
                                    onMouseOver={() => handleMouseOver(snippet.content)}
                                    onClick={() => setSnippetToInput(snippet.content)}
                                    className={`form-textarea max-w-full w-full h-20 form-control border-2 bg-gray-200 cursor-pointer ${i === index ? ' border-cyan-500' : ''}`}
                                    defaultValue={snippet.content} />
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
                <div className="flex items-start content-center justify-center p-2">
                    <textarea
                        tabIndex="-1"
                        className="form-textarea w-96 h-64 form-control bg-gray-300"
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
