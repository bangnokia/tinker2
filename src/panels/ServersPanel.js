import { useEffect, useState } from "react";
import ActionButton from "../buttons/ActionButton";
import RemoteServerService from "../services/RemoteServerService";
import ServerForm from "./ServerForm";

function ServersPanel({ changeProject }) {
    const [servers, setServers] = useState([])
    const [openForm, setOpenForm] = useState(false)
    const [server, setServer] = useState(null)

    const loadServers = function () {
        (new RemoteServerService()).index().then(data => setServers(data))
    }

    const deleteServer = function (server) {
        const newServers = servers.filter((i) => i.id && i.id !== server.id);
        setServers(newServers);
        (new RemoteServerService()).sync(newServers);
    }

    const editServer = function (server) {
        setOpenForm(true)
        setServer(server)
    }

    useEffect(() => loadServers(), [])

    return (
        <div className="flex space-x-10">
            <div className="w-80">
                <ActionButton className="mb-5" onClick={() => setOpenForm(!openForm)}>
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Add server
                </ActionButton>
                <ul>
                    {
                        servers.map((server, index) => (
                            <ServerItem server={server} key={index} {...{ editServer, deleteServer, changeProject }} />
                        ))
                    }
                </ul>
            </div>
            <div>
                {openForm && <ServerForm
                    server={server}
                    loadServers={loadServers}
                    setOpenForm={setOpenForm} />}
            </div>
        </div>
    )
}

function ServerItem({ server, deleteServer, editServer, changeProject, ...others }) {
    return (
        <li onClick={() => changeProject(server)}
            className="flex items-center justify-between hover:bg-indigo-400 py-2 px-2 rounded"
            tabIndex="0"
        >
            <div className="flex flex-col">
                <div className="text-sm">
                    {server.label} ({server.host})
                </div>
                <div className="text-xs text-gray-500">
                    {server.path}
                </div>
            </div>
            <div className="flex space-x-2">
                <svg onClick={(e) => { e.stopPropagation(); editServer(server) }} className="w-4 h-4 cursor-pointer transition hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                <svg onClick={(e) => { e.stopPropagation(); deleteServer(server) }} className="w-4 h-4 cursor-pointer transition hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
        </li>
    )
}

export default ServersPanel;