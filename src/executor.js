import { Command } from '@tauri-apps/api/shell';
import { resolveResource, resourceDir } from '@tauri-apps/api/path';
import DatabaseService from './services/DatabaseService';
import { encode } from 'js-base64'

export async function makeCommand(project, code, mode) {
    const base64Code = encode(code);
    const psychoPath = await resolvePsychoPath(project.type);
    let command = null;

    switch (project.type) {
        case 'local':
            command = await makeCommandOnLocalMachine(project, base64Code, psychoPath, mode)
            break;

        case 'ssh':
            command = makeCommandOnRemoteServer(project, base64Code, psychoPath, mode);
            break;

        default:
            throw new Error(`Project type ${project.type} is not supported.`)
    }

    return command;
}

async function makeCommandOnLocalMachine(project, base64Code, psychoPath, mode) {
    const database = new DatabaseService();
    const phpBinary = (await database.get('settings')).default_php_binary

    return `${phpBinary} '${psychoPath}' --target=${project.path} --code=${base64Code} --mode=${mode}`;
}

function makeCommandOnRemoteServer(project, code, psychoPath = '/tmp/psycho.phar', mode) {
    const { user, host, port, private_key, path, php_binary } = project;

    const args = [
        '-C',
        '-oStrictHostKeyChecking=no',
        '-oUserKnownHostsFile=/dev/null',
        '-oLogLevel=Error',
        '-i' + private_key,
        `-p ${port}`,
        `${user}@${host}`,
        php_binary,
        psychoPath,
        `--target=${path}`,
        `--code=${code}`,
        `--mode=${mode}`
    ];

    return `ssh ${args.join(' ')}`;
}

async function resolvePsychoPath(type) {
    if (type === 'local') {
        return await resolveResource('bin/psycho.phar');
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
