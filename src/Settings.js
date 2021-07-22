import ServersPanel from "./panels/ServersPanel";
import Panel from "./panels/Panel";
import PreferencesPanel from "./panels/PreferencesPanel";

function Settings({ setSettingsPanel, settingsPanel: panel }) {
    const closePanel = function () {
        setSettingsPanel('')
    }

    return (
        <div className="absolute left-0 top-0 h-full w-full backdrop-filter backdrop-blur-sm flex">
            {panel === 'servers' && (
                <Panel closePanel={closePanel} name="List servers">
                    <ServersPanel />
                </Panel>
            )}

            {panel === 'preferences' && (
                <Panel closePanel={closePanel} name="Preferences">
                    <PreferencesPanel />
                </Panel>
            )}
        </div>
    )
}

export default Settings;
