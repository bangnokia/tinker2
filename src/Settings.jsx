import ServersPanel from "./panels/ServersPanel";
import Panel from "./panels/Panel";
import PreferencesPanel from "./panels/PreferencesPanel";
import SnippetsPanel from "./panels/SnippetsPanel";
import { useState, useEffect } from 'react';
import DatabaseService from './services/DatabaseService';

function Settings({ setSettingsPanel, settingsPanel, changeProject }) {
    const [panel, setPanel] = useState(settingsPanel);

    const closePanel = function () {
        setPanel('')
        setSettingsPanel('')
    }

    const useProject = function (server) {
        closePanel();
        changeProject(server)
    }

    return (
        <div className={`absolute flex left-0 top-0 h-full w-full backdrop-filter backdrop-blur-sm`}>
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
