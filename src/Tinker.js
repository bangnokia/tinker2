import { useEffect, useState } from "react"
import { ensureDataFileExists, ensureFileExists, snippetsFile } from "./helpers"
import DatabaseService from "./services/DatabaseService"
import App from "./App"
import SplashScreen from "./SplashScreen"
import { SettingsProvider } from "./contexts/SettingsContext"
import { LicenseProvider } from "./contexts/LicenseContext"
import { SnippetsProvider } from "./contexts/SnippetsContext"

const db = new DatabaseService();

export default function Tinker2() {
    console.clear();
    const [hasDataFile, setHasDataFile] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [settings, setSettings] = useState(null)
    const [snippets, setSnippets] = useState(null)

    const ready = settings && hasDataFile && loaded;

    useEffect(() => {
        async function init() {
            await ensureDataFileExists()
            setHasDataFile(true)

            const settings = await db.get('settings', {
                default_php_binary: '',
                default_project: '',
                layout: 'vertical'
            })
            setSettings(settings)

            const snippets = await db.get('snippets', [])
            setSnippets(snippets)

            setLoaded(true)
        }

        init();
    }, [])

    return (
        <>{
            ready
                ?
                <SettingsProvider defaultValue={settings}>
                    <LicenseProvider>
                        <SnippetsProvider defaultValue={snippets}>
                            <App />
                        </SnippetsProvider>
                    </LicenseProvider>
                </SettingsProvider>
                :
                <SplashScreen />
        }</>
    )
}
