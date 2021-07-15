import { open } from "@tauri-apps/api/dialog";

function StatusBar({ directory, changeDirectory }) {
    const openFolderDialog = function () {
        open({
            multiple: false,
            directory: true
        }).then(dir => changeDirectory(dir));
    };

    return (
        <div className="status-bar flex items-center justify-between bg-gray-700 h-6 px-3 text-sm font-mono text-white">
            <div className="flex-end">{directory}</div>
            <div>
                <span onClick={openFolderDialog}>
                    <OpenFolderIcon />
                </span>
            </div>
        </div>
    );
}

function OpenFolderIcon() {
    return (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg>
    )
}

export default StatusBar;