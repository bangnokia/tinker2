import ServersPanel from "./panels/ServersPanel";
import Panel from "./panels/Panel";

function Settings({ setSettingsPanel, settingsPanel: panel }) {
    const closePanel = function () {
        setSettingsPanel('')
    }

    return (
        <div className="absolute left-0 top-0 h-full w-full backdrop-filter backdrop-blur-sm flex">
            {panel === 'servers' && (
                <Panel closePanel={closePanel}>
                    <ServersPanel />
                </Panel>
            )}
        </div>
    )
}

export default Settings;
