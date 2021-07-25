import { readTextFile, createDir, writeFile, BaseDirectory, readDir } from "@tauri-apps/api/fs"

export function dataFile() {
    return process.env.NODE_ENV === 'development' ? "tinker2/data_dev.json" : "tinker2/data.json"
}

export function isBase64(string) {
    return (new RegExp(`(?:^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$)`)).test(string)
}

export async function ensureDataFileExists() {
    const options = { dir: BaseDirectory.Data }
    const filePath = dataFile()

    try {
        await readTextFile(filePath, options)
    } catch (exception) {
        console.log('cant read data.json')
        try {
            await readDir('tinker2', options)
        } catch (ex) {
            console.log('cant cread tinker2 folder, create tinker2/', ex)
            await createDir('tinker2', options)
            console.log('create data.json')
            await writeFile({
                path: filePath,
                contents: "{}"
            }, options)
        }
    }
}