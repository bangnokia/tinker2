import { useState } from "react"
import Button from "../buttons/Button"
import { open } from "@tauri-apps/api/dialog"

function PreferencesPanel() {
    const [settings, setSettings] = useState({
        default_php_binary: '',
        default_project: ''
    })

    const selectPhpBinary = function () {
        open({
            multiple: false,
            directory: false,
        }).then(binary => {
            console.log('selected file', binary)
            return binary && setSettings({
                ...settings,
                'default_php_binary': binary
            })
        })
    }

    return (
        <form className="w-full" style={{ width: '500px' }}>
            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="default_php_binary" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    PHP binary
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-1">
                    <input value={settings.default_php_binary} type="text" id="default_php_binary" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    <Button onClick={selectPhpBinary}>Select</Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="default_project" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Default project
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-1">
                    <input type="text" id="default_project" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    <Button>Select</Button>
                </div>
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
                <input {...{ type, name, id, value, onChange, required }} {...otherProps} className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                <Button>Select</Button>
            </div>
        </div>
    )
}

export default PreferencesPanel