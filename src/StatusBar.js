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
        <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5C8 1.22386 7.77614 1 7.5 1C7.22386 1 7 1.22386 7 1.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V1.5ZM6 13V12H3C2.44772 12 2 11.5523 2 11V5C2 4.44772 2.44772 4 3 4H6V3H3C1.89543 3 1 3.89543 1 5V11C1 12.1046 1.89543 13 3 13H6ZM12 13H9V12H12C12.5523 12 13 11.5523 13 11V5C13 4.44772 12.5523 4 12 4H9V3H12C13.1046 3 14 3.89543 14 5V11C14 12.1046 13.1046 13 12 13Z" fill="currentColor"></path></svg>
    )
}

function BadgeType({ project }) {
    const className = project.type === 'local' ? 'text-gray-500 bg-gray-300' : 'bg-red-500'
    return (
        <span className={`px-1 py-0.5 text-xs border border-none rounded ` + className}>{project.label || project.type}</span>
    )
}

export default StatusBar;