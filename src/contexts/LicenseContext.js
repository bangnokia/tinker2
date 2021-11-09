import {createContext, useEffect} from "react";
import usePersistState from "../hooks/usePersistState";
import DatabaseService from "../services/DatabaseService";

export const LicenseContext = createContext();

export function LicenseProvider(props) {
    const [license, setLicense] = usePersistState('license', {
        key: '',
        is_valid: false
    });

    useEffect(() => {
        const database = new DatabaseService();
        database.get('license').then(value => {
            if (value) {
                setLicense(value)
            }
        })
    }, [setLicense])

    return (
        <LicenseContext.Provider value={[license, setLicense]} {...props} />
    )
}
