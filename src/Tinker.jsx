import { useEffect, useState } from "react"
import { ensureDataFileExists } from "./helpers"
import DatabaseService from "./services/DatabaseService"
import App from "./App"
import SplashScreen from "./SplashScreen"
import { SettingsProvider } from "./contexts/SettingsContext"
import { LicenseProvider } from "./contexts/LicenseContext"
import { SnippetsProvider } from "./contexts/SnippetsContext"
import { getMatches } from '@tauri-apps/api/cli'
import { currentDir, normalize } from '@tauri-apps/api/path'

const db = new DatabaseService();

export default function Tinker2() {
    const [hasDataFile, setHasDataFile] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [settings, setSettings] = useState(null)
    const [snippets, setSnippets] = useState(null)
    const [defaultProject, setDefaultProject] = useState(null)

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


            const matches = await getMatches();
            const dir = matches.args.directory.value
            let startupDir = null;
            if (dir !== false) {
                const normalizeDir = await normalize(dir)
                startupDir = normalizeDir === '/' || normalizeDir === '.' ? await currentDir() : normalizeDir;
            }

            setDefaultProject({ type: 'local', path: startupDir || settings.default_project })
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
                            <App
                                defaultProject={defaultProject}
                            />
                        </SnippetsProvider>
                    </LicenseProvider>
                </SettingsProvider>
                :
                <SplashScreen />
        }</>
    )
}
