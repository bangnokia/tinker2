import { Command } from '@tauri-apps/api/shell';
import { configDir, currentDir, resourceDir } from '@tauri-apps/api/path';

async function execute({ code, directory, type = 'local' }) {
    const base64Code = Buffer.from(code).toString('base64');
    const psychoPath = await resolvePsychoPath(type)

    // The problem here is where is the path of psycho.phar when we build the production app
    return await new Command(
        'php',
        [
            psychoPath,
            '--target=' + directory,
            '--code=' + base64Code,
        ]
    ).execute();
}

async function resolvePsychoPath(type) {
    if (type === 'local') {
        if (process.env.NODE_ENV === 'development') {
            return (await currentDir()) + "bin/psycho.phar"
        }

        return (await resourceDir()) + 'bin/psycho.phar';
    }

    // remote on server, we have to ensure uploaded the psycho.phar first
    return "/tmp/psycho.phar";
}

export default execute