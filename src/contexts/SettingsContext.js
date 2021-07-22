import { createContext, useEffect } from "react";
import usePersistState from "../hooks/usePersistState";
import DatabaseService from "../services/DatabaseService";

export const SettingsContext = createContext();

export function SettingsProvider(props) {
    const [settings, setSettings] = usePersistState('settings', {
        default_php_binary: '',
        default_project: ''
    })

    useEffect(() => {
        const database = new DatabaseService();
        database.get('settings').then(value => setSettings(value))
    }, [setSettings])

    return (
        <SettingsContext.Provider value={[settings, setSettings]} {...props} />
    );
}
