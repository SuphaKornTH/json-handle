import fs from 'node:fs';

// Queue Stucture.
const Queues = { write: [], update: [], erase: [] }; // For add data as string in queue with header (write header, update header, erase header);

export class create {
    constructor (JsonPath) { 
        this.JsonPath=JsonPath;
        if (!fs.existsSync(this.JsonPath)) throw ReferenceError(`cannot find json-data path at \`${this.JsonPath}\`, please \`mkdir ${this.JsonPath}\` before use it.`);
    }

    async write (data) {
        Queues.write.push(JSON.stringify(data));
        const _data = Queues.write.pop();

        // checking path
        if (!fs.existsSync(this.JsonPath)) throw ReferenceError(`cannot find json-data path at \`${this.JsonPath}\`, please \`mkdir ${this.JsonPath}\` before use it.`);

        // createStream
        const _state = fs.createWriteStream(this.JsonPath, { encoding: 'utf-8' });

        const current_data = fs.readFileSync(this.JsonPath, { encoding: 'utf-8' }).replace(/{}/g, '');
        if (!current_data || current_data === null) fs.writeFileSync(this.JsonPath, '{}', { encoding: 'utf-8' });

        return _state.write((current_data + _data).replace(/}{/g, ','));
    }

    async update (key, data) {
        Queues.update.push(JSON.stringify(data));
        const _data = Queues.update.pop();

        // checking path
        if (!fs.existsSync(this.JsonPath)) throw ReferenceError(`cannot find json-data path at \`${this.JsonPath}\`, please \`mkdir ${this.JsonPath}\` before use it.`);

        // createStream
        const _stream = fs.createReadStream(this.JsonPath, { encoding: 'utf-8' });
        const _state = fs.createWriteStream(this.JsonPath, { encoding: 'utf-8' });

        _stream.on('data', async (source) => {

            // Create JsonData
            var JsonData = JSON.parse(source.toString());

            // Errors
            if (!JsonData[key]) (await import('./errors/_loaders.js'))._existKey(key);
            if (JSON.stringify(JsonData[key]) === JSON.stringify(data[key])) (await import('./errors/_loaders.js'))._duplicatesData(key);

            // write data on JsonData
            delete JsonData[key];
            _state.write((JSON.stringify(JsonData) + _data).replace(/{}/g, '').replace(/}{/g, ','));
        });
    }

    async erase (key) {
        Queues.erase.push(key);
        const _key = Queues.erase.pop();

        // checking path
        if (!fs.existsSync(this.JsonPath)) throw ReferenceError(`cannot find json-data path at \`${this.JsonPath}\`, please \`mkdir ${this.JsonPath}\` before use it.`);

        // createStream
        const _stream = fs.createReadStream(this.JsonPath, { encoding: 'utf-8' });
        const _state = fs.createWriteStream(this.JsonPath, { encoding: 'utf-8' });

        _stream.on('data', async (source) => {
            // Create JsonData
            var JsonData = JSON.parse(source.toString());

            // write data on JsonData
            if (JsonData[_key]) delete JsonData[_key];
            else (await import('./errors/_loaders.js'))._existKey(_key);

            _state.write(JSON.stringify(JsonData), { encoding: 'utf-8' });
        });
    }

    // get methods.
    async getValue (key) {
        return await new Promise(async (resolve, reject) => {
            // checking path
            if (!fs.existsSync(this.JsonPath)) throw ReferenceError(`cannot find json-data path at \`${this.JsonPath}\`, please \`mkdir ${this.JsonPath}\` before use it.`);

            // createStream
            const _stream = fs.createReadStream(this.JsonPath, { encoding: 'utf-8' });

            return _stream.on('data', async (source) => {
                // Create JsonData
                var JsonData = JSON.parse(source.toString());
    
                // Errors
                if (!JsonData[key]) (await import('./errors/_loaders.js'))._existKey(key);
                // returns data;
                else resolve(JsonData[key]);
            });
        });
    }
    async getData (filter) {
        return await new Promise(async (resolve, reject) => {
            // checking path
            if (!fs.existsSync(this.JsonPath)) throw ReferenceError(`cannot find json-data path at \`${this.JsonPath}\`, please \`mkdir ${this.JsonPath}\` before use it.`);

            // createStream
            const _stream = fs.createReadStream(this.JsonPath, { encoding: 'utf-8' });

            return _stream.on('data', async (source) => {
                if (typeof(filter) === 'function') { 
                    // Create JsonData
                    var JsonData = JSON.parse(source.toString());
                    JsonData = (filter)(JsonData);

                    // returns data;
                    resolve(JsonData);
                }
                else {
                    // Create JsonData
                    var JsonData = JSON.parse(source.toString());
        
                    // returns data;
                    resolve(JsonData);
                }
            });
        });
    }
};