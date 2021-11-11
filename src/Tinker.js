import { useEffect, useState } from "react"
import { ensureDataFileExists } from "./helpers"
import DatabaseService from "./services/DatabaseService"
import App from "./App"
import SplashScreen from "./SplashScreen"
import { SettingsProvider } from "./contexts/SettingsContext"
import { LicenseProvider } from './contexts/LicenseContext'

export default function Tinker2() {
    const [hasDataFile, setHasDataFile] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [defaultSettings, setDetaultSettings] = useState({
        default_php_binary: '',
        default_project: '',
        layout: 'vertical'
    })

    const ready = hasDataFile && loaded;

    useEffect(() => {
        ensureDataFileExists().then(() => {
            setHasDataFile(true)

            const db = new DatabaseService();

            db.get('settings').then(settings => {
                if (settings) {
                    setDetaultSettings(settings)
                }
                setLoaded(true)
            })
        })
    }, [])

    return (
        <>{
            ready
                ?
                <SettingsProvider defaultValue={defaultSettings}>
                    <LicenseProvider>
                        <App />
                    </LicenseProvider>
                </SettingsProvider>
                :
                <SplashScreen />
        }</>
    )
}
