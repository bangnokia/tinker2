import { createContext, useEffect } from "react";
import usePersistState from "../hooks/usePersistState";
import DatabaseService from "../services/DatabaseService";

export const SettingsContext = createContext();

export function SettingsProvider({ defaultValue = null, ...otherProps }) {
    // we should pass proper defaultValue from App component
    const [settings, setSettings] = usePersistState('settings', defaultValue)

    useEffect(() => {
        const database = new DatabaseService();
        database.get('settings').then(value => {
            if (value) {
                setSettings(value)
            }
        })
    }, [setSettings])

    return (
        <SettingsContext.Provider value={[settings, setSettings]} {...otherProps} />
    );
}
