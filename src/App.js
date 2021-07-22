import { useEffect, useState } from 'react';
import StatusBar from './StatusBar';
import Playground from './Playground';
import Settings from './Settings';
import { SettingsProvider } from './contexts/SettingsContext';
import DatabaseService from './services/DatabaseService';

// local project
const defaultLocalProject = {
    type: 'local',
    path: ""
}

// ssh remote project
// const defaultSSHProject = {
//     type: 'ssh',
//     host: '178.128.127.19',
//     port: '22',
//     path: '/home/forge/lab.daudau.cc',
//     user: 'forge',
//     private_key: '~/.ssh/id_rsa',
//     passpharse: '',
//     php_binary: 'php',
// }

function App() {
    const [project, setProject] = useState(defaultLocalProject);
    const [settingsPanel, setSettingsPanel] = useState()
    const [defaultSettings, setDetaultSettings] = useState({
        default_php_binary: 'php',
        default_project: ''
    })

    const changeProject = function (project) {
        setProject(project)
    }

    useEffect(() => {
        const database = new DatabaseService();
        database.get('settings').then(settings => {
            setDetaultSettings(settings)
            if (!project.path) {
                setProject({
                    type: 'local',
                    path: settings.default_project
                })
            }
        })
    }, [project.path])

    return (
        <SettingsProvider defaultValue={defaultSettings}>
            <div className="font-sans h-screen flex flex-col bg-gray-500 overflow-hidden">
                <div className="flex-grow flex-shrink h-full overflow-scroll relative">
                    <Playground project={project} />

                    {
                        settingsPanel && <Settings
                            changeProject={changeProject}
                            settingsPanel={settingsPanel}
                            setSettingsPanel={setSettingsPanel} />
                    }
                </div>

                <div className="flex-end">
                    <StatusBar project={project}
                        changeProject={changeProject}
                        setSettingsPanel={setSettingsPanel}
                    />
                </div>
            </div>
        </SettingsProvider>
    );
}

export default App;
