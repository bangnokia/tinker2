import usePersistState from './usePersistState';

export function useSnippets() {
    const [snippets, setSnippets] = usePersistState('snippets', []);

    const addSnippet = (snippet) => {
        console.log('adding snippet', snippet);
        let newSnippets = [...snippets, {
            id: (new Date()).getTime(),
            content: snippet
        }];

        console.log('new snippets', newSnippets);

        setSnippets(newSnippets);
    }

    const deleteSnippet = (id) => {
        let newSnippets = snippets.filter((snippet) => snippet.id !== id);

        setSnippets(newSnippets);
    }

    return [snippets, addSnippet, deleteSnippet];
}