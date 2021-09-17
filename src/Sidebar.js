import { open } from "@tauri-apps/api/dialog";
import { useHotkeys } from 'react-hotkeys-hook';

function Sidebar({ changeProject, setSettingsPanel }) {
    function openFolderDialog() {
        open({
            multiple: false,
            directory: true
        }).then(dir => dir && changeProject({
            type: 'local',
            path: dir
        }));
    };

    useHotkeys('Ctrl+o', () => openFolderDialog());

    return (
        <div className="h-full w-12 flex-grow-0 flex-shrink-0 flex flex-col justify-between bg-transparent">
            <div className="pt-14">
                <button
                    onClick={openFolderDialog}
                    title="Open folder"
                    className="sidebar-icon"
                    type="button">
                    <OpenFolderIcon />
                </button>

                <button onClick={() => setSettingsPanel('servers')}
                    title="SSH Servers"
                    className="sidebar-icon"
                    type="button">
                    <ServerIcon />
                </button>
            </div>
            <div>
                <button onClick={() => setSettingsPanel('preferences')}
                    title="Settings"
                    className="sidebar-icon"
                    type="button">
                    <SettingsIcon />
                </button>
            </div>
        </div>
    );
}

function OpenFolderIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>
    )
}

function SettingsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    )
}

function ServerIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
    )
}

export default Sidebar;