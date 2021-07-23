import { open } from "@tauri-apps/api/dialog";
import { useSettings } from "./hooks/useSettings";

function StatusBar({ project, changeProject, setSettingsPanel }) {
    const [settings, setSettings] = useSettings();

    const toggleLayout = function () {
        setSettings({
            ...settings,
            'layout': settings.layout === 'vertical' ? 'horizontal' : 'vertical'
        })
    }

    const openFolderDialog = function () {
        open({
            multiple: false,
            directory: true
        }).then(dir => dir && changeProject({
            type: 'local',
            path: dir
        }));
    };

    return (
        <div className="status-bar w-full flex-shrink-0 flex flex-wrap items-center space-x-5 bg-gray-700 h-6 px-3 text-sm font-mono text-white">

            {/* Settings */}
            <div className="flex space-x-2">
                <button onClick={() => setSettingsPanel('preferences')}
                    type="button"
                    className="cursor-pointer hover:text-indigo-500" title="Settings">
                    <SettingsIcon />
                </button>
            </div>

            {/* Open projects */}
            <div className="flex space-x-1 items-center">
                <button onClick={openFolderDialog}
                    type="button"
                    className="cursor-pointer hover:text-indigo-500"
                    title="Open folder">
                    <OpenFolderIcon />
                </button>
                <button onClick={() => setSettingsPanel('servers')}
                    type="button"
                    className="cursor-pointer hover:text-indigo-500"
                    title="SSH Servers" >
                    <ServerIcon />
                </button>
            </div>

            {/* Switch layout */}
            <div className="flex">
                <button onClick={() => toggleLayout()}
                    type="button"
                    className={`cursor-pointer hover:text-indigo-500 transition transform ` + (settings.layout === 'vertical' ? 'rotate-180' : 'rotate-90')}
                    title="toggle layout">
                    <VerticalIcon />
                </button>
            </div>

            <div className="flex-grow text-right">
                <BadgeType project={project} />
                <span className="ml-2">{project.path || '/blackhole :)'}</span>
            </div>

        </div>
    );
}

function VerticalIcon() {
    return (
        <svg class="w-5 h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5C8 1.22386 7.77614 1 7.5 1C7.22386 1 7 1.22386 7 1.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V1.5ZM6 13V12H3C2.44772 12 2 11.5523 2 11V5C2 4.44772 2.44772 4 3 4H6V3H3C1.89543 3 1 3.89543 1 5V11C1 12.1046 1.89543 13 3 13H6ZM12 13H9V12H12C12.5523 12 13 11.5523 13 11V5C13 4.44772 12.5523 4 12 4H9V3H12C13.1046 3 14 3.89543 14 5V11C14 12.1046 13.1046 13 12 13Z" fill="currentColor"></path></svg>
    )
}

function BadgeType({ project }) {
    const className = project.type === 'local' ? 'text-gray-500 bg-gray-300' : 'bg-red-500'
    return (
        <span className={`px-1 py-0.5 text-xs border border-none rounded ` + className}>{project.label || project.type}</span>
    )
}

function OpenFolderIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>)
}

function ServerIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
    )
}

function SettingsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    )
}

export default StatusBar;