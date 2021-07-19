import { useState } from 'react';
import execute from './executor';

function Playground({ project }) {
    const [code, setCode] = useState("User::first()")
    const [output, setOutput] = useState('Press cmd + Enter to execute the code.');
    const [loading, setLoading] = useState(false);

    const runCode = function () {
        setLoading(true)
        execute({ code, directory: project.path })
            .then(({ stdout }) => {
                // if we can parse json output, then it's the success response
                // else just display the
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
        <div className="h-full grid grid-cols-2 divide-x-2 divide-gray-800">
            <div className="p-5 overflow-y-scroll">
                <button onClick={runCode} className="border bg-red-500">Execute</button>
                <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    autoCorrect="off"
                    className="w-full h-full bg-gray-500 focus:outline-none" />
            </div>

            <div className="result p-5 break-all whitespace-pre-wrap overflow-scroll">
                <div className="text-normal font-mono">
                    {output}
                </div>

                {
                    loading && (
                        <div className="absolute top-0 right-0 text-white">
                            loading...
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Playground;