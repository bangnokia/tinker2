import { useSettings } from "./hooks/useSettings";
import { useLicense } from './hooks/useLicense';

function StatusBar({ project, changeProject }) {
    const [settings, setSettings] = useSettings();
    const [license,] = useLicense();

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

    function toggleOutputMode() {
        setSettings({
            ...settings,
            'output_mode': (settings.output_mode && settings.output_mode === 'buffered') ? 'stream' : 'buffered'
        })
    }

    return (
        <div id="status-bar"
            className="status-bar w-full flex-shrink-0 flex flex-wrap items-center space-x-5 bg-dark-gray-100 h-6 px-3 text-xs font-mono text-white">
            <div className="flex-end">
                <button
                    onClick={() => switchToDefaultProject()}
                    className="hover:text-cyan-500"
                    title="Switch to default project">useDefault</button>
            </div>

            {/* Switch layout */}
            <div className="flex flex-end">
                <button onClick={() => toggleLayout()}
                    type="button"
                    className={`cursor-pointer hover:text-cyan-400 transition transform ` + (settings.layout === 'vertical' ? '' : 'rotate-90')}
                    title="Toggle layout">
                    <VerticalIcon />
                </button>
            </div>

            {/* Toggle output mode */}
            <div className="flex flex-end">
                <button onClick={() => toggleOutputMode()}
                    type="button"
                    className={`cursor-pointer hover:text-cyan-400 transition transform ` + (settings.output_mode === 'stream' ? 'text-cyan-500' : '')}
                    title="Toggle output buffered or stream">
                    <StatusOnlineIcon />
                </button>
            </div>

            {/* Vim mode */}
            <div id="editor-status-bar" className="flex items-center justify-center overflow-hidden"></div>

            {/* Pursechase status */}
            {!license.is_valid ? <div className="flex flex-end text-gray-700">Unregistered</div> : null}


            {/* Current project */}
            <div className="flex-grow text-right">
                <BadgeType project={project} />
                <span className="ml-2">{project.path || '/blackhole :)'}</span>
            </div>
        </div>
    );
}

function VerticalIcon() {
    return (
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm8.5-1v12H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8.5zm-1 0H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5V2z"></path>
        </svg>
    )
}

function StatusOnlineIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
    )
}

function BadgeType({ project }) {
    const className = project.type === 'local' ? 'text-gray-500 bg-gray-300' : 'bg-red-500'
    return (
        <span className={`px-1 py-0.5 text-xs border border-none rounded ` + className}>{project.label || project.type}</span>
    )
}

export default StatusBar;
