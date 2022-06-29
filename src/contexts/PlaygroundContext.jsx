import { invoke } from "@tauri-apps/api";
import { useState, createContext, useContext, useRef } from "react";
import execute, { makeCommand } from "../executor";

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

    const cleanOutput = function () {
        outputRef.current = '';
        setOutput('')
    }

    const appendOutput = function (line) {
        outputRef.current = outputRef.current.concat(line + '\n');
        setOutput(outputRef.current.trim());
    }

    const executeCode = async (project, code, mode) => {
        setLoading(true)
        cleanOutput()

        const command = makeCommand(project, code, mode);
        // console.log('commnand', command)
        const output = await invoke('execute_command', { command: command });
        console.log('output', output)
        setLoading(false)
        setOutput(output)
        return;


        if (mode === 'stream') {
            command.on('error', error => setOutput(error))
            command.stdout.on('data', line => appendOutput(line))
            command.stderr.on('data', line => appendOutput(line))
            command.on('close', () => setLoading(false))

            const child = await command.spawn();
            setProcess(child)
        } else {
            try {
                const result = await command.execute();
                setOutput(result.stdout + result.stderr)
            } catch (ex) {
                setOutput(ex)
            } finally {
                setLoading(false)
            }
        }
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
            cleanOutput,
            executeCode,
            killProcess,
        }} {...props} />
    )
}
