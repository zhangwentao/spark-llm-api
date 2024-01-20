/// <reference types="node" />
import { Transform } from 'stream';
import { ResponseBody } from './types';
declare class ResponseStream extends Transform {
    constructor();
    _transform(trunk: ResponseBody, encoding: any, callback: any): void;
}
export { ResponseStream };
//# sourceMappingURL=reponse-stream.d.ts.map