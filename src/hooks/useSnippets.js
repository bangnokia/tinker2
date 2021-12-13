import { SnippetsContext } from '../contexts/SnippetsContext';
import { useContext } from 'react';

export function useSnippets() {
    const context = useContext(SnippetsContext)

    if (!context) {
        throw new Error("useSnippets must be use within a SnippetsProvider.")
    }

    return context
}