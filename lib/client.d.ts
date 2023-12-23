/// <reference types="node" />
import { EventEmitter } from 'events';
import { Message, APIProtocol, ResponseBody, ModelVersion } from './types';
declare class Client extends EventEmitter {
    private url;
    private ws;
    private status;
    private appId;
    private version;
    private cache;
    private emitter;
    constructor(params: {
        apiKey: string;
        apiSecret: string;
        appId: string;
        version?: ModelVersion;
        protocal?: APIProtocol;
        host?: string;
    });
    private initWebSocket;
    private resolveDomain;
    private genRequestBody;
    private send;
    private handleWSMessage;
    chat(params: {
        messages: Array<Message>;
        temperature?: number;
        topK?: number;
        maxTokens?: number;
        chatId?: string;
        uid?: string;
    }): Promise<ResponseBody>;
}
export { Client };
//# sourceMappingURL=client.d.ts.map