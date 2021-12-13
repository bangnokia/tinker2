import { createContext } from "react";
import usePersistState from "../hooks/usePersistState";

export const SnippetsContext = createContext();

export function SnippetsProvider({ defaultValue = null, ...otherProps }) {
    // we should pass proper defaultValue from App component
    const [snippets, setSnippets] = usePersistState('snippets', defaultValue);

    const addSnippet = (snippet) => {
        setSnippets(snippets => [{
            id: (new Date()).getTime(),
            content: snippet
        }, ...snippets]);
    }

    const deleteSnippet = (id) => {
        setSnippets(snippets => snippets.filter((snippet) => snippet.id !== id));
    }

    return (
        <SnippetsContext.Provider value={[snippets, addSnippet, deleteSnippet]} {...otherProps} />
    );
}
