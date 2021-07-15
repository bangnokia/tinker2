import { Command } from '@tauri-apps/api/shell';
import config from './config/app';

async function execute({code, directory}) {
    const base64Code = Buffer.from(code).toString('base64');

    // The problem here is where is the path of psycho.phar when we build the production app
    const output = await new Command(
        'php',
        [
            config.psycho,
            '--target=' + directory,
            '--code=' + base64Code,
        ]
    ).execute();

    return output;
}

export default execute