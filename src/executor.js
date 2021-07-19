import { Command } from '@tauri-apps/api/shell';
import { currentDir, resourceDir } from '@tauri-apps/api/path';

async function execute({ code, project }) {
    const base64Code = Buffer.from(code).toString('base64');
    const psychoPath = await resolvePsychoPath(project.type)

    // The problem here is where is the path of psycho.phar when we build the production app
    switch (project.type) {
        case 'local':
            return await new Command(
                'php',
                [
                    psychoPath,
                    '--target=' + project.path,
                    '--code=' + base64Code,
                ]
            ).execute();

        case 'ssh':
            return await executeOnRemoteServer(project, base64Code, psychoPath);

        default:
            throw new Error(`Project type ${project.type} is not supported.`)
    }
}

async function executeOnRemoteServer(project, code, psychoPath = '/tmp/psycho.phar') {
    const { user, host, port, private_key, path, php_binary } = project;

    const args = [
        '-C',
        '-o StrictHostKeyChecking=no',
        '-o UserKnownHostsFile=/dev/null',
        `-i ${private_key}`,
        `-p ${port}`,
        `${user}@${host}`,
        php_binary,
        psychoPath,
        `--target=${path}`,
        `--code=${code}`
    ];

    const command = new Command('ssh', args)

    return await command.execute();
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

export async function uploadPsycho(project) {
    const { user, host, port, private_key } = project;

    const args = [
        await resolvePsychoPath('local'),
        `-i ${private_key}`,
        `-P ${port}`,
        `${user}@${host}:/tmp`,
    ];

    const command = new Command('scp', args)

    return await command.execute();
}

export default execute