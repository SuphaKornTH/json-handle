<h2 align='center'> JSON Handle </h2>
<p align='center'>Originally designed it for writing json databases only, but now we will modify it to work on other side as well.</p>

## Installation
**Node.js 16.6.0 or newer is required.**
```
npm i json-handle
```

# Features & Index
   - [Example usage](https://github.com/SuphaKornTH/json-handle/blob/main/readme.md#example-usage)
      - [Importing](https://github.com/SuphaKornTH/json-handle/blob/main/readme.md#importing)
      - [Set Response Time](https://github.com/SuphaKornTH/json-handle/blob/main/readme.md#set-response-time)
      - [Create JsonHandling](https://github.com/SuphaKornTH/json-handle/blob/main/readme.md#creating-json-handle)
      - [Write Data](https://github.com/SuphaKornTH/json-handle/blob/main/readme.md#write-method)
      - [Update Data](https://github.com/SuphaKornTH/json-handle/blob/main/readme.md#update-method)
      - [Erase Data](https://github.com/SuphaKornTH/json-handle/blob/main/readme.md#erase-method)
      - [Get Data](https://github.com/SuphaKornTH/json-handle/blob/main/readme.md#get-method)
   - [Links](https://github.com/SuphaKornTH/json-handle/blob/main/readme.md#links)

# Example usage
### Importing
Importing in Common JavaScript Files
```js
const {...} = require('json-handle');
```
Importing in ESM JavaScript Files
```js
import {...} from ('json-handle');
```

### Set Response Time
Importing from 'json-handle';
<br> _***Deprecated:***_ **~~`SetGlobalResponse`~~ and ~~`SetResponseTime`~~** is no longer required as **queues** are implemented in this section as of package version `2.1.6`

**SetResponseTime** method.
```js
// import local response mothod.
import { SetResponseTime } from 'json-handle';

// set response time for some path.
SetResponseTime('./tests/database.json', 200); // SetResponseTime(local, response);
// parameter: `local` for local module and package.
// parameter: `response` for set timeout. [default -> 200]
```

**SetGlobalResponse** method.
```js
// import global response mothod.
import { SetGlobalResponse } from 'json-handle';

// set global response time.
SetGlobalResponse(200); // SetGlobalResponse(response);
// parameter: `response` for set timeout. [default -> 200]
```

### Creating Json Handle
 - example is json database
```js
// import local modules.
import { create } from 'json-handle';

// find 'json' file from path as database.
const database = new create('./database.json');
```
### Write method.
```js
import { randomInt, randomUUID } from 'crypto';

// create data as object.
let data = { [randomUUID()]: `${randomInt(999999)}` };
// and writing object as database.
database.write(data);
```
output for write method. example filename is `randomized.json`
```jsonc
{"dcd15169-7a67-4196-9513-0f467123f053":"289511"}
// {"uuid from randomly": "int from randomly"}
```

### Update method.
use the data of the file `randomized.json`.
```js
import { randomInt, randomUUID } from 'crypto';

// create data as object.
let data = { [randomUUID()]: `${randomInt(999999)}` };
// and update object as database.
database.update("dcd15169-7a67-4196-9513-0f467123f053", data);
```
output for update method.
```jsonc
{"31620958-4825-4f81-b7d5-3207e30c6065":"48411"}
// {"uuid from randomly updated": "int from randomly updated"}
```

### Erase method.
use the data of the file `randomized.json`.
```js
// erase object key as database.
database.erase("dcd15169-7a67-4196-9513-0f467123f053");
```
output for erase method. example filename is `randomized.json`
```jsonc
{}
// {} All data in that key will be deleted.
```

### Get method.
use getValue method and use the data of the file `randomized.json`.
```js
// getValue() method for get value from key.
const value = database.getValue("dcd15169-7a67-4196-9513-0f467123f053");
console.info(value);
```
console output for getValue method
```shell
"289511"
```

use getData method and use the data of the file `randomized.json`.
```js
// getData() method for get value from key.
const data = database.getData();
console.info(data);
```
console output for getValue method
```shell
{"dcd15169-7a67-4196-9513-0f467123f053":"289511"}
```


# Simple Success File.
In `methods.js` from `tests` folder
```js
// import others modules. 
import { randomInt, randomUUID } from 'crypto';
const uuid = randomUUID();

// import local modules.
import { create } from '../libs/handling.js';
import { SetGlobalResponse, SetResponseTime } from '../libs/responseBridge.js';

// set response time for some path.
SetResponseTime('./tests/database.json', 100);
// set global response time.
SetGlobalResponse(1500);

// find 'json' file from path to handling. | example is json database
const database = new create('./tests/database.json');


//** A simple usage example is below. **//

1. // example: `write` method | use 'data' type as 'Object' to write database.
// create 'data' as 'object'.
let a = { [uuid]: `${randomInt(999999)}` };
// write 'data' on database.
database.write(a);


2. // example: `update` method | update 'key' and 'data' to update at database and using as current.
// create 'data' as 'object'.
let b = { [uuid] :`${randomInt(999999)}` };
// update 'data' with 'key' on database.
database.update(uuid, b);


3. // example: `erase` method | erase 'data' with 'key' on database. 
database.erase(uuid);
```

In `database-handling.json` from `tests` folder.
```json
{"dataA":21, "dataB": 56, "dataC": "instant"}
```
In `handing.js` from `tests` folder and use `database-handling.json` in this example.
```js
// import local modules
import { create, SetResponseTime } from '../JsonHandling.js';

const JsonHandling = new create('./tests/database-handling.json');
SetResponseTime('./tests/database-handling.json', 100);

// Use async function
async function AwaitFunction () {
   const v = await JsonHandling.getValue("dataA");
   const object = await JsonHandling.getData(({ dataA, dataC }) => ({ dataA, dataC }));
   console.info(v, object); // console output: 21 {"dataA":21, "dataB": 56, "dataC": "instant"}
};
AwaitFunction();

// Or use then
JsonHandling.getValue("dataA").then(v => { console.info(a) }); // console output: 21
JsonHandling.getData(({ dataA, dataC }) => ({ dataA, dataC })).then(object => { console.info(object) }); // console output: { "dataA":21, "dataC": "instant" }
```

### <div align='center'>Links</div>
<div align='center'><a href='https://www.npmjs.com/package/json-handle'>NPM</a> | <a href='https://github.com/SuphaKornTH/json-handle'>GitHub</a> | <a href='https://www.paypal.com/paypalme/suphakTH'>Donate via Paypal</a></div>