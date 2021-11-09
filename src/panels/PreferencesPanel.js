import Button from "../buttons/Button"
import { open } from "@tauri-apps/api/dialog"
import { useSettings } from "../hooks/useSettings"
import { Command } from "@tauri-apps/api/shell";
import { useState } from "react";
import { validateLicenseKey } from '../services/validate-license-key';

function PreferencesPanel() {
    const [settings, setSettings] = useSettings()
    const [detecting, setDetecting] = useState(false)
    const [licenseKey, setLicenceKey] = useState(settings.license_key);

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
            return folder && setSettings({
                ...settings,
                'default_project': folder
            })
        })
    }

    const detectPhpPath = async function() {
        setDetecting(true)
        const result = await (
            new Command(process.platform === 'win32' ? 'where' : 'which', 'php')
        ).execute()
        setDetecting(false)
        setSettings({
            ...settings,
            'default_php_binary': result.stdout
        })
    }

    const useLicense = async function() {
        try {
            const result = await validateLicenseKey(licenseKey);

            if (result.is_valid) {
                // save to files
                setSettings({
                    ...settings,
                    'license_key': licenseKey,
                    'is_valid': true
                })
                alert('Thank you for your purchase <3!');
            } else {
                alert('Your license is seem invalid');
                setSettings({
                    ...settings,
                    'is_valid': false
                })
            }
        } catch (ex) {
            alert('Can not connect to license server!')
        }
    }

    return (
        <form className="w-full" style={{ width: '690px' }}>

            {/* PHP binary */}
            <div className="grid grid-cols-3 gap-4 items-start pt-3">
                <label htmlFor="default_php_binary" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    PHP binary
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 flex space-x-1">
                    <input value={settings.default_php_binary} onChange={(e) => setSettings({
                        ...settings,
                        'default_php_binary': e.target.value
                    })} type="text" id="default_php_binary" placeholder="php" className="form-input max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    <Button onClick={selectPhpBinary}>Select</Button>
                    {!settings.default_php_binary &&
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
                    <input value={settings.default_project} readOnly={true} placeholder="/Users/yourname/Code/dummy-laravel8" type="text" id="default_project" className="form-input max-w-lg block w-full shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
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
                            checked={settings.layout === 'vertical'}
                            onChange={(e) => setSettings({
                                ...settings,
                                layout: e.target.value
                            })}
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
                            checked={settings.layout === 'horizontal'}
                            onChange={(e) => setSettings({
                                ...settings,
                                layout: e.target.value
                            })}
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
                            checked={settings.key_binding === 'normal'}
                            onChange={(e) => setSettings({
                                ...settings,
                                key_binding: e.target.value
                            })}
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
                            checked={settings.key_binding === 'vim'}
                            onChange={(e) => setSettings({
                                ...settings,
                                key_binding: e.target.value
                            })}
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
                    <Button onClick={useLicense}>Use License</Button>
                </div>
            </div>
        </form>
    )
}

export default PreferencesPanel
