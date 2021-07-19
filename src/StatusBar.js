import { open } from "@tauri-apps/api/dialog";

function StatusBar({ project, changeProject }) {
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
        <div className="status-bar flex-shrink-0 flex items-center justify-between bg-gray-700 h-6 px-3 text-sm font-mono text-white">
            <div className="">
                <span onClick={openFolderDialog} className="cursor-pointer hover:text-indigo-500">
                    <OpenFolderIcon />
                </span>
            </div>
            <div>{project.path}</div>
        </div>
    );
}

function OpenFolderIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>)
}

export default StatusBar;