import ServersPanel from "./panels/ServersPanel";
import Panel from "./panels/Panel";
import PreferencesPanel from "./panels/PreferencesPanel";
import SnippetsPanel from "./panels/SnippetsPanel";

function Settings({ setSettingsPanel, settingsPanel: panel, changeProject }) {
    const closePanel = function () {
        setSettingsPanel('')
    }

    const useProject = function (server) {
        closePanel();
        changeProject(server)
    }

    return (
        <div className="absolute left-0 top-0 h-full w-full backdrop-filter backdrop-blur-sm flex">
            {panel === 'servers' && (
                <Panel closePanel={closePanel} name="List servers">
                    <ServersPanel changeProject={useProject} />
                </Panel>
            )}

            {panel === 'preferences' && (
                <Panel closePanel={closePanel} name="Preferences">
                    <PreferencesPanel closePanel={closePanel} />
                </Panel>
            )}

            {panel === 'snippets' && (
                <Panel closePanel={closePanel} name="Snippets">
                    <SnippetsPanel closePanel={closePanel} />
                </Panel>
            )}
        </div>
    )
}

export default Settings;
