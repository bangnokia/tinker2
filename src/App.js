import { useEffect, useState } from 'react';
import StatusBar from './StatusBar';
import Playground from './Playground';
import Settings from './Settings';
import Sidebar from './Sidebar';
import { useSettings } from './hooks/useSettings';
import { open } from "@tauri-apps/api/dialog";
import { useHotkeys } from 'react-hotkeys-hook';

// local project
const defaultLocalProject = {
    type: 'local',
    path: ''
}

function App() {
    const [project, setProject] = useState(defaultLocalProject);
    const [settingsPanel, setSettingsPanel] = useState()
    const [settings,] = useSettings()

    // Setup keyboard shotcuts
    useHotkeys('Cmd+o', () => openFolderDialog(), { enableOnTags: ['INPUT', 'TEXTAREA'] });
    useHotkeys('Cmd+Shift+o', () => setSettingsPanel('servers'), { enableOnTags: ['INPUT', 'TEXTAREA'] })
    useHotkeys('Cmd+,', () => setSettingsPanel('preferences'), { enableOnTags: ['INPUT', 'TEXTAREA'] })

    const changeProject = function (project) {
        setProject(project)
    }

    function openFolderDialog() {
        open({
            multiple: false,
            directory: true
        }).then(dir => dir && changeProject({
            type: 'local',
            path: dir
        }));
    };

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
        <div className="font-sans h-screen flex flex-col bg-gray-500 overflow-hidden"
            style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
            <div className="flex flex-grow flex-shrink h-full overflow-hidden relative">
                <Sidebar changeProject={changeProject}
                    openFolderDialog={openFolderDialog}
                    setSettingsPanel={setSettingsPanel} />

                <div className="flex w-full h-full relative">
                    <Playground project={project} />
                    {
                        settingsPanel && <Settings
                            changeProject={changeProject}
                            settingsPanel={settingsPanel}
                            setSettingsPanel={setSettingsPanel} />
                    }
                </div>
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
