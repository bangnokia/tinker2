import { useEffect, useState } from 'react';
import appConfig from './config/app';
import StatusBar from './StatusBar';
import Playground from './Playground';

function App() {
    const [project, setProject] = useState({
        type: 'local',
        path: appConfig.defaultDirectory
    });

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
