import { useState } from "react";
import ActionButton from "../buttons/ActionButton";
import ServerForm from "./ServerForm";

function ServersPanel({ closePanel }) {
    const [servers, setServers] = useState([
        'daudau.cc',
        'hhtq.daudau.cc',
        'lab.daudau.cc',
        'google.com'
    ])

    const [openForm, setOpenForm] = useState(true)

    return (
        <div className="flex space-x-10">
            <div>
                <ActionButton className="mb-5">
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Add server
                </ActionButton>
                <ul>
                    {
                        servers.map((server, index) => (
                            <li key={index}>{server}</li>
                        ))
                    }
                </ul>
            </div>
            <div>
                {openForm && <ServerForm />}
            </div>
        </div>
    )
}

export default ServersPanel;