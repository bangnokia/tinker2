import usePersistState from './usePersistState';

export function useSnippets(snippet) {
    const [snippets, setSnippets] = usePersistState('snippets', []);

    const addSnippet = (snippet) => {
        let newSnippets = [...snippets, {
            id: (new Date()).getTime(),
            content: snippet
        }];

        setSnippets(newSnippets);
    }

    const deleteSnippet = (id) => {
        let newSnippets = snippets.filter((snippet) => snippet.id !== id);

        setSnippets(newSnippets);
    }

    return [snippets, addSnippet, deleteSnippet];
}