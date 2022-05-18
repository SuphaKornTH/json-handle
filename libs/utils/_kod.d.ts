/**
 `_kod` is the `keep old data` function for saving old data and ~~writing old data on json file~~ returning old data according to response time.
  Can set response time at `SetGlobalResponse` and `SetResponseTime` function.
 - ~~Usually this function is private because we don't know what users can do with it~~, but now you can use it I don't know can it be used in your style?
 * @param databasePath database path.
 * @deprecated `_kod` function is no longer required as queues are implemented in this section as of package version 2.1.6
 * @returns old data as javascript object
 */
export async function _kod (databasePath: import('node:fs').PathOrFileDescriptor): Promise<object>;