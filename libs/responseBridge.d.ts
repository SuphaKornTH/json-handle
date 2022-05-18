/**
  The response time can be set from 100 - 3000 ms, the chance of error is reduced. But the time to write or do anything will be slow according to the response time.
  - The simplest explanation is the response time of interactions.
  - default is 1500 ms
 * @version 2.2.0
 * @deprecated `SetResponseTime` is no longer required as queues are implemented in this section as of package version 2.1.6
 */
export async function SetResponseTime (key: string | import('fs').PathLike, response?: number): Promise<void>;

/**
 Note that the "SetGlobalResponse" field is synonymous with "SetResponseTime" just global, and could be used as well.
 * @version 4.5.2~GlobalVersion
 * @deprecated `SetGlobalResponse` is no longer required as queues are implemented in this section as of package version 2.1.6
 */
export async function SetGlobalResponse (response?: number): Promise<void>;
