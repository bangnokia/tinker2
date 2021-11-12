import { readTextFile, createDir, writeFile, BaseDirectory, readDir } from "@tauri-apps/api/fs"

export function dataFile() {
    return process.env.NODE_ENV === 'development' ? "tinker2/data_dev.json" : "tinker2/data.json"
}

export function snippetsFile() {
    return 'tinker2/snippets.json';
}

export function isBase64(string) {
    return (new RegExp(`(?:^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$)`)).test(string)
}

export async function ensureDataFileExists() {
    const options = { dir: BaseDirectory.Data }
    const filePath = dataFile()

    try {
        await readDir('tinker2', options)
    } catch (exception) {
        await createDir('tinker2', options)
    }

    try {
        await readTextFile(filePath, options)
    } catch (ex) {
        await writeFile({
            path: filePath,
            contents: "{}"
        }, options)
    }
}

/**
* @var string filePath relative path
*/
export async function ensureFileExists(filePath) {
    const options = { dir: BaseDirectory.Data }

    try {
        await readDir('tinker2', options)
    } catch (exception) {
        await createDir('tinker2', options)
    }

    try {
        await readTextFile(filePath, options)
    } catch (ex) {
        await writeFile({
            path: filePath,
            contents: "{}"
        }, options)
    }
}
