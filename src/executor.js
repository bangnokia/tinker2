import { Command } from '@tauri-apps/api/shell';
import config from './config/app';

async function execute({code, target=null}) {
    const base64Code = Buffer.from(code).toString('base64');
    target = target || config.defaultDirectory;

    // The problem here is where is the path of psycho.phar when we build the production app
    const output = await new Command(
        'php',
        [
            config.psycho,
            '--target=' + config.defaultDirectory,
            '--code=' + base64Code,
        ]
    ).execute();

    return output;
}

export default execute