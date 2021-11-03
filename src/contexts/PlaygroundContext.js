import { useState, createContext, useContext, useRef } from "react";
import execute from "../executor";

const PlaygroundContext = createContext();

export function usePlayground() {
    const context = useContext(PlaygroundContext);

    if (!context) {
        throw new Error("useSettings must be use within a SettingsProvider.")
    }

    return context
}

export function PlaygroundProvider(props) {
    const [loading, setLoading] = useState(false)
    const [output, setOutput] = useState(null)

    const outputRef = useRef('');

    const cleanOutput = function () {
        outputRef.current = '';
        setOutput('')
    }

    const appendOutput = function (line) {
        outputRef.current = outputRef.current.concat(line + '\n');
        setOutput(outputRef.current.trim());
    }


    const executeCode = async (project, code) => {
        console.log('in input callback')
        setLoading(true)

        const command = await execute({ code, project })

        cleanOutput()

        command.on('error', error => console.log('error') && setOutput(error))
        command.stdout.on('data', line => appendOutput(line))
        command.stderr.on('data', line => appendOutput(line))
        command.on('close', () => setLoading(false))

        command.spawn();
    }

    return (
        <PlaygroundContext.Provider value={{ loading, setLoading, output, setOutput, appendOutput, cleanOutput, executeCode }} {...props} />
    )
}
