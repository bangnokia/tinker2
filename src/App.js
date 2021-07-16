import { useEffect, useState } from 'react';
import appConfig from './config/app';
import StatusBar from './StatusBar';
import Playground from './Playground';

function App() {
    const [directory, setDirectory] = useState(appConfig.defaultDirectory);

    const changeDir = function(dir) {
        setDirectory(dir)
    }

    useEffect(() => {
        document.title = directory;
    })

    return (
        <div className="h-screen flex flex-col bg-gray-500 overflow-hidden">
            <div className="flex-grow flex-shrink h-full overflow-scroll">
                <Playground directory={directory} />
            </div>

            <div className="flex-end">
                <StatusBar directory={directory} changeDirectory={changeDir} />
            </div>
        </div>
    );
}

export default App;
