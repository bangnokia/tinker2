import { useState } from "react";
import Panel from "../Panel"


function ServersPanel() {
    const [servers, setServers] = useState([
        'daudau.cc',
        'hhtq.daudau.cc',
        'lab.daudau.cc',
        'google.com'
    ])

    return (
        <Panel name="List of servers">
            <div className="w-64">
                <ul>
                    {
                        servers.map((server, index) => (
                            <li key={index}>{server}</li>
                        ))
                    }
                </ul>
            </div>
        </Panel>
    )
}

export default ServersPanel;