import { useState } from "react"
import ActionButton from "../buttons/ActionButton";

function ServerForm() {
    const [server, setServer] = useState({
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
        console.log(server);
    }

    return (
        <form className="w-96" onSubmit={submit}>
            <FormGroup label="Label" name="label" id="label" value={server.label} onChange={handleChange} />
            <FormGroup label="Host" name="host" id="host" value={server.host} onChange={handleChange} />
            <FormGroup label="Port" name="port" id="port" value={server.port} onChange={handleChange} />
            <FormGroup label="User" name="user" id="user" value={server.user} onChange={handleChange} />
            <FormGroup label="Private key" name="private_key" id="private_key" value={server.private_key} onChange={handleChange} />
            <FormGroup label="Passpharse" name="passpharse" id="passpharse" value={server.passpharse} onChange={handleChange} />
            <FormGroup label="Project path" placeholder="/var/www/daudau.cc" name="project_path" id="project_path" value={server.path} onChange={handleChange} />
            <FormGroup label="PHP binary" name="php_binary" id="php_binary" value={server.php_binary} onChange={handleChange} />

            <div className="mt-5">
                <ActionButton type="submit">Create</ActionButton>
            </div>
        </form>
    )
}

function FormGroup({ label, id, name, value, type = 'text', onChange, ...otherProps }) {
    return (
        <div className="grid grid-cols-3 gap-4 items-start pt-5">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                {label}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input type="text" name={name} id={id} value={value} onChange={onChange} {...otherProps} className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>
    )
}

export default ServerForm;