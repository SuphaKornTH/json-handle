/**
    For create Json Manager with path json. 
    @param JsonPath json file path.
    @version 2.1.4
* */
export class create {
    constructor (JsonPath: import('node:fs').PathOrFileDescriptor); // encoding?: 'utf8' | 'utf-8' | 'ascii' | 'base64' | 'base64url' | 'hex' | 'ucs2' | 'ucs-2' | 'utf16le' | 'utf-16le' | 'binary' | 'latin1'
    /**
        use for write data on json file as current data.
        @param data Put new data on the json file.
        @version 2.1.4
        @access follow `JsonPath` constructor on `create` class.
    * */
    async write (data: object): Promise<boolean>;
    /**
        use for update data on json file as current data.
        @param key Find data by key and updated.
        @param data Put new data on the json file.
        @version 2.1.4
        @access follow `JsonPath` constructor on `create` class.
    * */
    async update (key: string, data: object): Promise<void>;
    /**
        use for erase data by key on json file as current data
        @param key Find data by key and deleted.
        @version 2.1.4
        @access follow `JsonPath` constructor on `create` class.
    * */
    async erase (key: string): Promise<void>;

    // finding functions.
    /**
        use for get value by key on json file.
        @param key get value by key and return it.
        @version 2.1.5-3
        @access follow `JsonPath` constructor on `create` class.
        @returns promise as `object`
    * */
    async getValue (key: string): Promise<object>;
    /**
        use for get data on json file.
        @param filter put function to filter something.
        @argument filter filter data example:`({ dataA, dataC }) => ({ dataA, dataC })`
        @version 2.1.5-3
        @access follow `JsonPath` constructor on `create` class.
        @returns promise as `object`
    * */
    async getData (filter?: Function): Promise<object | string | string[] | symbol>;
 
    //deprecated
    /**
        For finding datas without keys but using kws instead (keywords), I'm just challenging myself.
        @access follow `JsonPath` constructor on `create` class.
        @returns promise as `symbol | string`
        @deprecated Unsuccessfully.
    * */
    async findDatas (kws: object | string[] | symbol): Promise<string | string[] | symbol>;
    /**
        For finding keys by data kws (keywords), I'm just challenging myself.
        @access follow `JsonPath` constructor on `create` class.
        @returns promise as `symbol | string`
        @deprecated Unsuccessfully.
    * */
    async findKeys (kws: string | string[] | symbol): Promise<string | string[] | symbol>;
}
