import { useState } from 'react';
import execute from './executor';
import { Command } from '@tauri-apps/api/shell';

function Playground({ directory }) {
    const [code, setCode] = useState("User::first()")
    const [output, setOutput] = useState('Press cmd + Enter to execute the code.');

    const runCode = function () {
        execute({ code, directory })
            .then(result => {
                setOutput(Buffer.from(result.stdout, 'base64').toString('ascii'))
                console.log(result.stdout)
            })
            .catch(error => console.log('error', error))
    }

    return (
        <div className="grid grid-cols-2 divide-x-2 divide-gray-800 flex-grow">
            <div className="p-5">
                <button onClick={runCode} className="border bg-red-500">Execute</button>
                <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    autoCorrect="off"
                    className="w-full h-full bg-gray-500 focus:outline-none" />
            </div>

            <div className="result p-5 break-words whitespace-pre-wrap">
                <pre className="">
                    {output}
                </pre>
            </div>
        </div>
    )
}

export default Playground;