import { useEffect, useState } from 'react';
import appConfig from './config/app';
import StatusBar from './StatusBar';
import Playground from './Playground';
import ServersPanel from './panels/ServersPanel';
import Settings from './Settings';

// local project
const defaultLocalProject = {
    type: 'local',
    path: appConfig.defaultDirectory
}

// ssh remote project
const defaultSSHProject = {
    type: 'ssh',
    host: '178.128.127.19',
    port: '22',
    path: '/home/forge/lab.daudau.cc',
    user: 'forge',
    private_key: '~/.ssh/id_rsa',
    passpharse: '',
    php_binary: 'php',
}

function App() {
    const [project, setProject] = useState(defaultSSHProject);
    const [settingsPanel, setSettingsPanel] = useState('')

    useEffect(() => {
        document.title = project.path;
    })

    const changeProject = function (project) {
        setProject(project)
    }

    return (
        <div className="h-screen flex flex-col bg-gray-500 overflow-hidden">
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
    );
}

export default App;
