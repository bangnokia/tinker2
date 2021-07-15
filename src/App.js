import { useEffect } from 'react';
import appConfig from './config/app';
import StatusBar from './StatusBar';
import Playground from './Playground';

function App() {
    const workingDirectory = appConfig.defaultDirectory;

    useEffect(() => {
        document.title = workingDirectory;
    })

    return (
        <div className="h-screen flex flex-col bg-gray-500 overflow-hidden">
            <Playground workingDirectory={workingDirectory} />

            <StatusBar workingDirectory={workingDirectory} />
        </div>
    );
}

export default App;
