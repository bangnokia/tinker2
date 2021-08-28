import { useSettings } from "./hooks/useSettings";

function StatusBar({ project, changeProject }) {
    const [settings, setSettings] = useSettings();

    function toggleLayout() {
        setSettings({
            ...settings,
            'layout': settings.layout === 'vertical' ? 'horizontal' : 'vertical'
        })
    }

    function switchToDefaultProject() {
        changeProject({
            type: 'local',
            path: settings.default_project
        });
    }

    return (
        <div className="status-bar w-full flex-shrink-0 flex flex-wrap items-center space-x-5 bg-gray-700 h-6 px-3 text-sm font-mono text-white">
            <div>
                <button
                    onClick={() => switchToDefaultProject()}
                    className="hover:text-indigo-500"
                    title="Switch to default project">useDefault</button>
            </div>

            {/* Switch layout */}
            <div className="flex">
                <button onClick={() => toggleLayout()}
                    type="button"
                    className={`cursor-pointer hover:text-indigo-500 transition transform ` + (settings.layout === 'vertical' ? '' : 'rotate-90')}
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
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm8.5-1v12H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8.5zm-1 0H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5V2z"></path>
        </svg>
    )
}

function BadgeType({ project }) {
    const className = project.type === 'local' ? 'text-gray-500 bg-gray-300' : 'bg-red-500'
    return (
        <span className={`px-1 py-0.5 text-xs border border-none rounded ` + className}>{project.label || project.type}</span>
    )
}

export default StatusBar;