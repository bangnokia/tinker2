import { invoke } from "@tauri-apps/api";
import { useState, createContext, useContext, useRef } from "react";
import { makeCommand } from "../executor";

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
    const [process, setProcess] = useState(null)
    const [shouldRunCode, setShouldRunCode] = useState(false)

    const outputRef = useRef('');

    const clearOutput = function () {
        outputRef.current = '';
        setOutput('')
    }

    const appendOutput = function (line) {
        outputRef.current = outputRef.current.concat(line + '\n');
        setOutput(outputRef.current.trim());
    }

    const executeCode = async (project, code, mode) => {
        setLoading(true)
        clearOutput()

        let output = '';
        const command = await makeCommand(project, code, mode);
        console.log('command', command)

        try {
            output = await invoke('execute_command', { command: command });
        } catch (ex) {
            output = ex;
        } finally {
            setLoading(false)
        }

        setOutput(output)

        return;
    }

    const killProcess = async function () {
        if (process) {
            await process.kill();
            setLoading(false)
            setProcess(null)
        }
    }


    const runCode = function (project, code, outputMode) {
        if (!code) {
            return;
        }

        if (loading) {
            killProcess()
        } else {
            executeCode(project, code, outputMode)
            // increaseCount();
        }
    };

    return (
        <PlaygroundContext.Provider value={{
            loading,
            setLoading,
            output,
            setOutput,
            shouldRunCode,
            setShouldRunCode,
            runCode,
            appendOutput,
            cleanOutput: clearOutput,
            executeCode,
            killProcess,
        }} {...props} />
    )
}
