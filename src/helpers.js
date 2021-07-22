import { readTextFile, createDir, writeFile, BaseDirectory } from "@tauri-apps/api/fs"

export function isBase64(string) {
    return (new RegExp(`(?:^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$)`)).test(string)
}

export async function ensureDataFileExists() {
    const options = { dir: BaseDirectory.Data }

    try {
        await readTextFile("tinker2/data.json", options)
    } catch (exception) {
        console.log('trying to create data.json file.');

        await createDir('tinker2', options)

        await writeFile({
            path: "tinker2/data.json",
            contents: "{}"
        }, options)
    }
}