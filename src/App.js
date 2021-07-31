import { useEffect, useState } from 'react';
import StatusBar from './StatusBar';
import Playground from './Playground';
import Settings from './Settings';
import Sidebar from './Sidebar';
import { useSettings } from './hooks/useSettings';

// local project
const defaultLocalProject = {
    type: 'local',
    path: ''
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
    const [settings,] = useSettings()

    const changeProject = function (project) {
        setProject(project)
    }

    useEffect(() => {
        if (settings.default_php_binary) {
            if (!project.path) {
                setProject({
                    type: 'local',
                    path: settings.default_project || ''
                })
            }
        } else {
            setSettingsPanel('preferences')
        }

    }, [project.path, settings.default_php_binary, settings.default_project])

    return (
        <div className="font-sans h-screen flex flex-col bg-gray-500 overflow-hidden">
            <div className="flex flex-grow flex-shrink h-full overflow-scroll relative">
                <Sidebar />
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
    );
}

export default App;
