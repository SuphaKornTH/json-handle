import fs from 'node:fs';

export async function _kod (databasePath) {
    const _stream = fs.createReadStream('./libs/configs/response.json', { encoding: 'utf-8' });

    _stream.on('data', async (source) => {
        const response = JSON.parse(source.toString());
        if (response[Buffer.from(databasePath, 'base64')]) var responseTimeout = response[Buffer.from(databasePath, 'base64')];
        else var responseTimeout = response.global;

        // run _kod function
        const _data = fs.readFileSync(databasePath, { encoding: 'utf-8' });
        await new Promise(res => setTimeout(res, responseTimeout));
        return JSON.parse(_data);
        // if (!_data || _data === null) fs.writeFileSync(databasePath, '{}', { encoding: 'utf-8' });
        // else fs.writeFileSync(databasePath, _data, { encoding: 'utf-8' });
    });
}