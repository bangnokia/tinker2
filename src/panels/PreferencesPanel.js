import Button from "../buttons/Button"
import { open } from "@tauri-apps/api/dialog"
import { useSettings } from "../hooks/useSettings"
import { useLicense } from '../hooks/useLicense';
import { Command } from "@tauri-apps/api/shell";
import { useState } from "react";
import { validateLicenseKey } from '../services/validate-license-key';
import ActionButton from "../buttons/ActionButton";

function PreferencesPanel() {
    const [settings, setSettings] = useSettings()
    const [license, setLicense] = useLicense();
    const [detecting, setDetecting] = useState(false)
    const [licenseKey, setLicenceKey] = useState(() => license.key);
    const [phpBinary, setPhpBinary] = useState(() => settings.default_php_binary)
    const [defaultProject, setDefaultProject] = useState(() => settings.default_project)
    const [layout, setLayout] =  useState(() => settings.layout)
    const [keybinding, setKeybinding] = useState(() => settings.key_binding || 'normal')

    const selectPhpBinary = function() {
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

    const selectDefaultProject = function() {
        open({
            multiple: false,
            directory: true,
        }).then(folder => {
            return folder && setDefaultProject(folder)
        })
    }

    const detectPhpPath = async function() {
        setDetecting(true)

        const result = await (
            new Command(process.platform === 'win32' ? 'where' : 'which', 'php')
        ).execute()

        setDetecting(false)

        if (result.stdout) {
            setPhpBinary(result.stdout)
        } else {
            alert('Can not detect php binary path.')
        }
    }

    const validateLicense = async function() {
        try {
            const result = await validateLicenseKey(licenseKey);

            if (result.is_valid) {
                // save to files
                setLicense({
                    key: licenseKey,
                    is_valid: true
                })
                alert('Thank you for your purchase <3!');
            } else {
                setLicense({
                    key: licenseKey,
                    is_valid: false
                })
                alert('Your license is seem invalid!');
            }
        } catch (ex) {
            alert('Can not connect to license server!')
        }
    }

    const handleSubmit = function(e) {
        e.preventDefault();
        setSettings({
            ...settings,
            default_php_binary: phpBinary,
            default_project: defaultProject,
            layout: layout,
            key_binding: keybinding
        })
    }

    return (
        <form className="w-full" style={{ width: '690px' }} onSubmit={handleSubmit}>

            {/* PHP binary */}
            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="default_php_binary" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    PHP binary
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-1">
                    <input value={phpBinary} onChange={(e) => setPhpBinary(e.target.value)} type="text" id="default_php_binary" placeholder="php" className="form-input max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    <Button onClick={selectPhpBinary}>Select</Button>
                    {!phpBinary &&
                        <Button onClick={detectPhpPath} className={detecting ? 'animate-spin' : ''}>Detect</Button>
                    }
                </div>
            </div>

            {/* Default project */}
            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="default_project" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Default project
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-1">
                    <input value={defaultProject} readOnly={true} placeholder="/Users/yourname/Code/dummy-laravel8" type="text" id="default_project" className="form-input max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    <Button onClick={selectDefaultProject}>Select</Button>
                </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="layout" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Layout
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-5">
                    <div className="flex items-center space-x-2 pt-2">
                        <input
                            id="layout-vertical"
                            name="layout"
                            type="radio"
                            value="vertical"
                            className="form-radio focus:ring-cyan-500 h-4 w-4 text-cyan-500 border-gray-300"
                            checked={layout === 'vertical'}
                            onChange={(e) => setLayout(e.target.value)}
                        />
                        <label htmlFor="layout-vertical" className="ml-3 block text-sm font-medium text-gray-700">
                            Vertical
                        </label>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <input
                            id="layout-horizontal"
                            name="layout"
                            type="radio"
                            value="horizontal"
                            className="form-radio focus:ring-cyan-500 h-4 w-4 text-cyan-500 border-gray-300"
                            checked={layout === 'horizontal'}
                            onChange={(e) => setLayout(e.target.value)}
                        />
                        <label htmlFor="layout-horizontal" className="ml-3 block text-sm font-medium text-gray-700">
                            Horizontal
                        </label>
                    </div>
                </div>
            </div>

            {/* Key binding */}
            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="layout" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Key binding
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-5">
                    <div className="flex items-center space-x-2 pt-2">
                        <input
                            id="key-binding-normal"
                            name="key_binding"
                            type="radio"
                            value="normal"
                            className="form-radio focus:ring-cyan-500 h-4 w-4 text-cyan-500 border-gray-300"
                            checked={keybinding === 'normal'}
                            onChange={(e) => setKeybinding(e.target.value)}
                        />
                        <label htmlFor="key-binding-normal" className="ml-3 block text-sm font-medium text-gray-700">
                            Normal
                        </label>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <input
                            id="key-binding-vim"
                            name="key_binding"
                            type="radio"
                            value="vim"
                            className="form-radio focus:ring-cyan-500 h-4 w-4 text-cyan-500 border-gray-300"
                            checked={keybinding === 'vim'}
                            onChange={(e) => setKeybinding(e.target.value)}
                        />
                        <label htmlFor="key-binding-vim" className="ml-3 block text-sm font-medium text-gray-700">
                            Vim
                        </label>
                    </div>
                </div>
            </div>

            {/* License */}
            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="default_php_binary" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    License key
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-1">
                    <input onChange={(e) => setLicenceKey(e.target.value.trim())} value={licenseKey} type="text" id="license_key" className="form-input max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    <Button onClick={validateLicense}>Use License</Button>
                </div>
            </div>

            {/* Save button */}
            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-1">
                    <ActionButton type="submit">Save</ActionButton>
                </div>
            </div>
        </form>
    )
}

export default PreferencesPanel
