import { Command } from '@tauri-apps/api/shell';
import { currentDir, resourceDir } from '@tauri-apps/api/path';
import DatabaseService from './services/DatabaseService';

async function execute({ code, project }) {
    const base64Code = Buffer.from(code).toString('base64');
    const psychoPath = await resolvePsychoPath(project.type)

    let command = null;
    // The problem here is where is the path of psycho.phar when we build the production app
    switch (project.type) {
        case 'local':
            command = makeCommandOnLocalMachine(project, base64Code, psychoPath)
            break;

        case 'ssh':
            command = makeCommandOnRemoteServer(project, base64Code);
            break;

        default:
            throw new Error(`Project type ${project.type} is not supported.`)
    }

    return command;
}

async function makeCommandOnLocalMachine(project, base64Code, psychoPath) {
    const database = new DatabaseService();
            const phpBinary = (await database.get('settings')).default_php_binary

            return new Command(
                phpBinary,
                [
                    psychoPath,
                    '--target=' + project.path,
                    '--code=' + base64Code,
                ]
            );
}

function makeCommandOnRemoteServer(project, code, psychoPath = '/tmp/psycho.phar') {
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

    return new Command('ssh', args)
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
        `-P ${port}`,
        `-i ${private_key}`,
        await resolvePsychoPath('local'),
        `${user}@${host}:/tmp`,
    ];

    const command = new Command('scp', args)

    return await command.execute();
}

export default execute