import { useState, createContext, useContext } from "react";

const PlaygroundContext = createContext();

export function useLoading() {
    const context = useContext(PlaygroundContext);

    if (!context) {
        throw new Error("useSettings must be use within a SettingsProvider.")
    }

    return context
}

export function PlaygroundProvider(props) {
    const [loading, setLoading] = useState(false)

    return (
        <PlaygroundContext.Provider value={[loading, setLoading]} {...props} />
    )
}