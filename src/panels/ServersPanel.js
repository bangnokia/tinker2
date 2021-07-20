import { useState } from "react";
import Panel from "./Panel"


function ServersPanel({ closePanel }) {
    const [servers, setServers] = useState([
        'daudau.cc',
        'hhtq.daudau.cc',
        'lab.daudau.cc',
        'google.com'
    ])

    return (
        <div className="w-64">
            <ul>
                {
                    servers.map((server, index) => (
                        <li key={index}>{server}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ServersPanel;