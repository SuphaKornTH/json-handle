import fs from 'node:fs';

// import local modules
import { _InvalidKey } from './errors/_loaders.js';


export async function SetResponseTime (key, response = 200) {

    if (typeof(key) !== 'string') throw new TypeError(`'key' parameter is type string only but we found ${typeof(key)}`); else if (typeof(response) !== 'number') throw new TypeError(`'response' parameter is type number only but we found ${typeof(key)}`); 
    const ElementId = Buffer.from(key, 'base64');
    if (!fs.existsSync(key)) _InvalidKey(ElementId);

    const ResponseRange = `The range of the 'response' variable should be greater than or equal to 100 milliseconds and less than or equal to 3000 milliseconds, but we found ${response} in the response variable.`;
    
    // checking response
    if (response < 100 || response > 3000) throw new RangeError(`${ResponseRange}`);
    
    // response-data
    const responseData = JSON.parse(fs.readFileSync('./libs/configs/response.json', { encoding: 'utf-8' }));

    if (responseData[ElementId] && responseData[ElementId] !== response) {
        delete responseData[ElementId];
        const responseObject = { [ElementId]: response };
        fs.writeFileSync('./libs/configs/response.json', (JSON.stringify(responseData) + JSON.stringify(responseObject)).replace(/{}/g, '').replace(/}{/g, ','), { encoding: 'utf-8' });
        console.info(`Encoding Key with 'base64' -> Set Response of ( ${ElementId} ) is ${response}ms.`);
    }
    else if (!responseData[ElementId]) {
        const old_data = fs.readFileSync('./libs/configs/response.json', { encoding: 'utf-8' }).replace(/{}/g, '');
        const responseObject = { [ElementId]: response };
        fs.writeFileSync('./libs/configs/response.json', (old_data + JSON.stringify(responseObject)).replace(/}{/g, ','), { encoding: 'utf-8' });
        console.info(`Encoding Key with 'base64' -> Set Response of ( ${ElementId} ) is ${response}ms.`);
    }
}

export async function SetGlobalResponse (response = 200) {
    if (typeof(response) !== 'number') throw new TypeError(`'response' parameter is type number only but we found ${typeof(response)}`);

    const ResponseRange = `The range of the 'response' variable should be greater than or equal to 100 milliseconds and less than or equal to 3000 milliseconds, but we found ${response} in the response variable.`;
    
    // checking response
    if (response < 100 || response > 3000) throw new RangeError(`${ResponseRange}`);
    
    // response-data
    const responseData = JSON.parse(fs.readFileSync('./libs/configs/response.json', { encoding: 'utf-8' }));
    
    delete responseData.global;
    const responseObject = { global: response };
    fs.writeFileSync('./libs/configs/response.json', (JSON.stringify(responseData) + JSON.stringify(responseObject)).replace(/{}/g, '').replace(/}{/g, ','), { encoding: 'utf-8' });
    if (response !== responseData.global) console.info(`Set Global Response is ${response}ms.`);
}