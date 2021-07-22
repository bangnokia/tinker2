import { BaseDirectory, readTextFile, writeFile } from "@tauri-apps/api/fs";

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
        let rawData = await readTextFile(this.dataFile, { dir: BaseDirectory.Data });

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
}

export default RemoteServerService;