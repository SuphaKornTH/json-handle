// import others modules. 
import { randomInt, randomUUID } from 'crypto';
const uuid = randomUUID();

// import local modules.
import { create, SetGlobalResponse, SetResponseTime } from '../JsonHandling.js';

// set response time for some path.
SetResponseTime('./tests/database.json', 100);
// set global response time.
SetGlobalResponse(1500);

// find 'json' file from path to handling. | example is json database
const database = new create('./tests/database.json');


//** A simple usage example is below. **//

1 // example: `write` method | use 'data' type as 'Object' to write database.
// create 'data' as 'object'.
let a = { [uuid]: `${randomInt(999999)}` };
// write 'data' on database.
database.write(a);


2 // example: `update` method | update 'key' and 'data' to update at database and using as current.
// create 'data' as 'object'.
let b = { [uuid] :`${randomInt(999999)}` };
// update 'data' with 'key' on database.
database.update(uuid, b);


3 // example: `erase` method | erase 'data' with 'key' on database. 
database.erase(uuid);
