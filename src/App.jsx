import { useEffect, useState } from 'react';
import StatusBar from './StatusBar';
import Playground from './Playground';
import Settings from './Settings';
import Sidebar from './Sidebar';
import { useSettings } from './hooks/useSettings';
import { open } from "@tauri-apps/api/dialog";
import { useHotkeys } from 'react-hotkeys-hook';
import { loader } from '@monaco-editor/react';
loader.config({
    paths: { vs: '/min/vs' }
})

function App({ defaultProject }) {
    const [settingsPanel, setSettingsPanel] = useState()
    const [settings, setSettings] = useSettings()
    const [project, setProject] = useState(defaultProject);


    // Setup keyboard shotcuts
    useHotkeys('Cmd+o', () => openFolderDialog(), { enableOnTags: ['INPUT', 'TEXTAREA'] });
    useHotkeys('Cmd+Shift+o', () => setSettingsPanel('servers'), { enableOnTags: ['INPUT', 'TEXTAREA'] })
    useHotkeys('Cmd+,', () => setSettingsPanel('preferences'), { enableOnTags: ['INPUT', 'TEXTAREA'] })
    useHotkeys('Cmd+b', () => setSettingsPanel('snippets'), { enableOnTags: ['INPUT', 'TEXTAREA'] })
    useHotkeys('Cmd+\\', () => setSettings({ ...settings, layout: settings.layout === 'vertical' ? 'horizontal' : 'vertical' }), { enableOnTags: ['INPUT', 'TEXTAREA'] })

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
        if (!project.path) {
            setSettingsPanel('preferences')
        }
    }, [project.path])

    return (
        <div className="font-sans h-screen flex flex-col bg-dark-gray overflow-hidden">
            <div className="flex flex-grow flex-shrink h-full overflow-hidden relative">

                <Sidebar changeProject={changeProject}
                    openFolderDialog={openFolderDialog}
                    setSettingsPanel={setSettingsPanel} />

                <div className="flex w-full h-full relative z-10">
                    <Playground project={project} />

                    <div className={`w-screen absolute h-full z-0 left-0 flex transition-all transform ` + (settingsPanel ? 'translate-x-0' : '-translate-x-[150vw]')}>
                        {settingsPanel &&
                            <Settings
                                changeProject={changeProject}
                                settingsPanel={settingsPanel}
                                setSettingsPanel={setSettingsPanel} />
                        }
                    </div>
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
