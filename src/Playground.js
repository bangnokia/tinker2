import { useState, useEffect } from 'react';
import execute from './executor';
import { uploadPsycho } from './executor';
import { useSettings } from './hooks/useSettings';

function Playground({ project }) {
    const [code, setCode] = useState("base_path()")
    const [output, setOutput] = useState('Press cmd + Enter to execute the code.')
    const [loading, setLoading] = useState(false)
    const [settings,] = useSettings()
    const layoutClasses = settings.layout === 'vertical' ? 'grid-cols-2 divide-x-2' : 'grid-cols-1 divide-y-2';

    useEffect(() => {
        if (project.type === 'ssh') {
            uploadPsycho(project).then(function () {
                console.log('uploaded psycho' + (new Date()).toString())
            })
        }
    }, [project])

    const runCode = function (e) {
        e.preventDefault();
        setLoading(true)
        execute({ code, project })
            .then(({ stdout }) => {
                try {
                    const result = JSON.parse(stdout.trim())
                    setOutput(result.output)
                } catch (ex) {
                    setOutput(stdout.trim())
                }
            })
            .finally(() => setLoading(false))
    }

    return (
        <div
            className={`h-full grid  divide-gray-800 transition transform ` + layoutClasses}>
            <form className="p-5 overflow-y-scroll" onSubmit={runCode}>
                <input
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    autoCorrect="off"
                    autoFocus={true}
                    className="w-full bg-gray-500 focus:outline-none" />
                <button onClick={runCode} className="border bg-red-500">Execute</button>
            </form>

            <div className="result p-5 break-all whitespace-pre-wrap overflow-scroll">
                <div className="text-normal font-mono">
                    {output}
                </div>

                {
                    loading && (
                        <div className="absolute top-2 right-2 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-spin" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Playground;