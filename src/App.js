import { useEffect, useState } from 'react';
import appConfig from './config/app';
import StatusBar from './StatusBar';
import Playground from './Playground';

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

    const changeProject = function (project) {
        setProject(project)
    }

    useEffect(() => {
        document.title = project.path;
    })

    return (
        <div className="h-screen flex flex-col bg-gray-500 overflow-hidden">
            <div className="flex-grow flex-shrink h-full overflow-scroll">
                <Playground project={project} />
            </div>

            <div className="flex-end">
                <StatusBar project={project} changeProject={changeProject} />
            </div>
        </div>
    );
}

export default App;
