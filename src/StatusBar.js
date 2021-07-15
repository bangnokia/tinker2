function StatusBar({ workingDirectory }) {
    return (
        <div className="status-bar flex items-center justify-between bg-gray-700 h-6 px-3 text-sm font-mono text-white">
            <div>
                settings icons
            </div>

            <div className="flex-end">{workingDirectory}</div>
        </div>
    );
}

export default StatusBar;