import { useSettings } from './useSettings';

export function useSnippet(snippet) {
    const [settings, setSettings] = useSettings();

    let snippets = settings.snippets || [];

    const addSnippet = (snippet) => {
        snippets.push(snippet);
        setSettings({ ...settings, snippets });
    }

    const deleteSnippet = (index) => {
        snippets.splice(index, 1);
        setSettings({ ...settings, snippets });
    }

    return [snippets, addSnippet, deleteSnippet];
}