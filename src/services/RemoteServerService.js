import { BaseDirectory, readTextFile, writeFile, createDir } from "@tauri-apps/api/fs";

class RemoteServerService {
    constructor() {
        this.servers = [];
        this.dataFile = 'tinker2/data.json';
    }

    async index() {
        const data = await this.database();

        this.servers = data['servers'] || [];

        return this.servers;
    }

    async store(server) {
        server['id'] = (new Date()).getTime();

        (await this.index()).unshift(server);

        return await this.persist();
    }

    async update(id, server) {
        const servers = await this.index();
        const index = servers.findIndex(server => server.id === id);
        servers[index] = server;

        return await this.sync(servers);
    }

    async sync(servers) {
        this.servers = servers;

        return await this.persist()
    }

    async database() {
        let rawData;

        try {
            rawData = await readTextFile(this.dataFile, { dir: BaseDirectory.Data });
        } catch (ex) {
            if (ex === 'failed to execute API: No such file or directory (os error 2)') {
                rawData = "{}";
                await this.ensureDatabaseFileExist();
            } else {
                throw new Error('Can not read data.json file')
            }
        }

        return JSON.parse(rawData);
    }

    async persist() {
        // write to file?
        const data = await this.database();

        data['servers'] = this.servers;

        return await writeFile({
            path: this.dataFile,
            contents: JSON.stringify(data, null, 4)
        }, { dir: BaseDirectory.Data })
    }

    async ensureDatabaseFileExist() {
        await createDir('tinker2', {
            dir: BaseDirectory.Data
        })
        await writeFile({
            path: this.dataFile,
            contents: "{}"
        }, { dir: BaseDirectory.Data })
    }
}

export default RemoteServerService;