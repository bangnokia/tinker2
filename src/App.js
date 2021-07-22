import { useState } from 'react';
import StatusBar from './StatusBar';
import Playground from './Playground';
import Settings from './Settings';
import { SettingsProvider } from './contexts/SettingsContext';

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

    const changeProject = function (project) {
        setProject(project)
    }

    return (
        <SettingsProvider>
            <div className="font-sans h-screen flex flex-col bg-gray-500 overflow-hidden">
                <div className="flex-grow flex-shrink h-full overflow-scroll relative">
                    <Playground project={project} />

                    {/* System preferences */}
                    {settingsPanel && <Settings settingsPanel={settingsPanel} setSettingsPanel={setSettingsPanel} />}
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
