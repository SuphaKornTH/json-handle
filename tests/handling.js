// import local modules
import { create, SetResponseTime } from '../JsonHandling.js';

const JsonHandling = new create('./tests/database-handling.json');
SetResponseTime('./tests/database-handling.json', 100);

async function getData () {
    const v = await JsonHandling.getValue("dataA");
    const object = await JsonHandling.getData(({ dataA, dataC }) => ({ dataA, dataC }));
    console.info(v, object);
};

getData();