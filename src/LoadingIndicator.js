import { useLoading } from "./contexts/PlaygroundContext";
import { useLayoutEffect } from 'react';

export default function LoadingIndicator() {
    const [loading,] = useLoading()

    useLayoutEffect(() => {
        if (loading && document.getElementById('play-code-button')) {
            document.getElementById('play-code-button').classList.add('animate-spin', 'text-cyan-500');
        } else {
            document.getElementById('play-code-button').classList.remove('animate-spin', 'text-cyan-500');
        }
    }, [loading])

    return null;
}