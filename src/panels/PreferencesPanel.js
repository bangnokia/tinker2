import Button from "../buttons/Button"
import { open } from "@tauri-apps/api/dialog"
import { useSettings } from "../hooks/useSettings"
import { Command } from "@tauri-apps/api/shell";
import { useState } from "react";

function PreferencesPanel() {
    const [settings, setSettings] = useSettings()
    const [detecting, setDetecting] = useState(false)

    const selectPhpBinary = function () {
        open({
            multiple: false,
            directory: false,
        }).then(binary => {
            return binary && setSettings({
                ...settings,
                'default_php_binary': binary
            })
        })
    }

    const selectDefaultProject = function () {
        open({
            multiple: false,
            directory: true,
        }).then(folder => {
            return folder && setSettings({
                ...settings,
                'default_project': folder
            })
        })
    }

    const detectPhpPath = async function () {
        setDetecting(true)
        const result = await (new Command('which', 'php')).execute()
        setDetecting(false)
        setSettings({
            ...settings,
            'default_php_binary': result.stdout
        })
    }

    return (
        <form className="w-full" style={{ width: '690px' }}>
            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="default_php_binary" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    PHP binary
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-1">
                    <input value={settings.default_php_binary} onChange={(e) => setSettings({
                        ...settings,
                        'default_php_binary': e.target.value
                    })} type="text" id="default_php_binary" placeholder="php" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    <Button onClick={selectPhpBinary}>Select</Button>
                    {!settings.default_php_binary &&
                        <Button onClick={detectPhpPath} className={detecting ? 'animate-spin' : ''}>Detect</Button>
                    }
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="default_project" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Default project
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-1">
                    <input value={settings.default_project} readOnly={true} type="text" id="default_project" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    <Button onClick={selectDefaultProject}>Select</Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="layout" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Layout
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-1">
                    <select className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" value={settings.layout} onChange={(e) => setSettings({
                        ...settings,
                        layout: e.target.value
                    })}>
                        <option value="vertical">Vertical</option>
                        <option value="horizontal">Horizontal</option>
                    </select>
                </div>
            </div>
        </form>
    )
}

export default PreferencesPanel