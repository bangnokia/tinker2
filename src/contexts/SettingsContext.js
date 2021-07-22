import { createContext, useEffect } from "react";
import usePersistState from "../hooks/usePersistState";
import DatabaseService from "../services/DatabaseService";

export const SettingsContext = createContext();

export function SettingsProvider({ defaultValue = null, ...otherProps }) {
    const [settings, setSettings] = usePersistState('settings', defaultValue || {
        default_php_binary: 'php',
        default_project: ''
    })

    useEffect(() => {
        const database = new DatabaseService();
        database.get('settings').then(value => {
            setSettings(value)
        })
    }, [setSettings])

    return (
        <SettingsContext.Provider value={[settings, setSettings]} {...otherProps} />
    );
}
