import { useState } from 'react';
import execute from './executor';

function Playground({ workingDirectory }) {
    const [code, setCode] = useState("ls")
    const [output, setOutput] = useState('Press cmd + Enter to execute the code.');

    const runCode = function () {
        execute({
            code: code,
            target: workingDirectory
        })
            .then(result => setOutput(result.stdout))
            .catch(error => console.log('error', error))
    }

    return (
        <div className="grid grid-cols-2 divide-x-2 divide-gray-800 flex-grow">
            <div className="p-5">
                <button onClick={runCode} className="border bg-red-500">Execute</button>
                <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    autocorrect="off"
                    className="w-full h-full bg-gray-500 focus:outline-none" />
            </div>

            <div className="result p-5 break-words whitespace-pre-wrap">
                <div className="break-words break-all whitespace-pre-line font-mono">
                    {output}
                </div>
            </div>
        </div>
    )
}

export default Playground;