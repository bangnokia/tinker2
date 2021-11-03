import { useState } from "react"
import ActionButton from "../buttons/ActionButton";
import Button from "../buttons/Button";
import RemoteServerService from "../services/RemoteServerService";

function ServerForm({ server: serverObject, index = null, loadServers, setOpenForm }) {
    const [server, setServer] = useState(serverObject || {
        id: '',
        type: 'ssh',
        label: '',
        path: '',
        host: '',
        port: 22,
        user: '',
        private_key: '~/.ssh/id_rsa',
        passpharse: '',
        php_binary: 'php',
    })

    const handleChange = function (e) {
        const name = e.target.name;
        const value = e.target.value;

        setServer({
            ...server,
            [name]: value
        })
    }

    const submit = function (e) {
        e.preventDefault();

        const remoteServerService = new RemoteServerService();

        if (!server.id) {
            remoteServerService.store(server).then(() => loadServers())
        } else {
            remoteServerService.update(server.id, server).then(() => {
                loadServers()
                setOpenForm(false)
            })
        }
    }

    return (
        <form className="w-96" onSubmit={submit}>
            <FormGroup label="Label" name="label" id="label" required="required" value={server.label} autoFocus={true} onChange={handleChange} />
            <FormGroup label="Host" name="host" id="host" required="required" value={server.host} onChange={handleChange} />
            <FormGroup label="Port" name="port" id="port" required="required" value={server.port} onChange={handleChange} />
            <FormGroup label="User" name="user" id="user" required="required" value={server.user} onChange={handleChange} />
            <FormGroup label="Private key" name="private_key" required="required" id="private_key" value={server.private_key} onChange={handleChange} />
            <FormGroup label="Passpharse" name="passpharse" id="passpharse" value={server.passpharse} onChange={handleChange} />
            <FormGroup label="Project path" placeholder="/var/www/daudau.cc" name="path" id="path" required="required" value={server.path} onChange={handleChange} />
            <FormGroup label="PHP binary" name="php_binary" id="php_binary" value={server.php_binary} required="required" onChange={handleChange} />

            <div className="mt-5 flex justify-end space-x-2">
                <ActionButton type="submit">{server.id ? 'Update' : 'Create'}</ActionButton>
                <Button type="button"
                    onClick={() => setOpenForm(false)}>Cancel</Button>
            </div>
        </form>
    )
}

function FormGroup({ label, id, name, value, type = 'text', required, onChange, ...otherProps }) {
    return (
        <div className="grid grid-cols-3 gap-4 items-start pt-3">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input {...{ type, name, id, value, onChange, required }} {...otherProps} className="form-input max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>
    )
}

export default ServerForm;