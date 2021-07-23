import { readTextFile, BaseDirectory, writeFile } from "@tauri-apps/api/fs";
import { dataFile } from "../helpers";

export default class DatabaseService {
    constructor() {
        this.dataFile = dataFile();
        this.data = null;
    }

    async loadData() {
        let rawData = await readTextFile(this.dataFile, { dir: BaseDirectory.Data });
        this.data = JSON.parse(rawData);
    }

    async set(key, value) {
        await this.ensureDataLoaded()

        this.data[key] = value;

        this.persist()
    }

    async get(key, defaultValue = null) {
        await this.ensureDataLoaded()

        return this.data[key] || defaultValue
    }

    async ensureDataLoaded() {
        if (this.data === null) {
            await this.loadData();
        }
    }

    async persist() {
        return await writeFile({
            path: this.dataFile,
            contents: JSON.stringify(this.data, null, 4)
        }, { dir: BaseDirectory.Data })
    }

    async data() {
        await this.ensureDataLoaded();

        return this.data;
    }
}