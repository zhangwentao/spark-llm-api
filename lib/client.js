"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const events_1 = require("events");
const ws_1 = require("ws");
const types_1 = require("./types");
const constants_1 = require("./constants");
const authorization_1 = require("./authorization");
const reponse_stream_1 = require("./reponse-stream");
class Client extends events_1.EventEmitter {
    constructor(params) {
        super();
        const { apiKey, apiSecret, appId, version = constants_1.DEFAULT_MODEL_VERSION, protocal = constants_1.DEFAULT_API_PROTOCOL, host = constants_1.DEFAULT_API_HOST, streamMode = false } = params;
        this.appId = appId;
        this.version = version;
        this.status = types_1.StatusEnum.DISCONNECTED;
        this.streamMode = streamMode;
        this.emitter = new events_1.EventEmitter();
        this.url = (0, authorization_1.getAuthorizedURL)({
            apiKey,
            apiSecret,
            version,
            protocal,
            host
        });
    }
    initWebSocket(params) {
        if (this.ws) {
            this.ws.removeAllListeners();
        }
        const { onOpen } = params;
        const ws = new ws_1.WebSocket(this.url);
        ws.on('error', (err) => {
            console.log(err);
        });
        ws.on('close', (code, reason) => {
            // console.error('closed')
            // console.log(code, reason.toString('utf-8'))
        });
        ws.on('open', () => {
            // console.info('websocket established')
            this.status = types_1.StatusEnum.CONNECTED;
            onOpen && onOpen();
        });
        ws.on('message', (data) => {
            const dataStr = data.toString('utf-8');
            const dataObj = JSON.parse(dataStr);
            if (this.streamMode) {
                this.responseStream.write(dataObj);
            }
            else {
                this.handleWSMessage({ responseBody: dataObj });
            }
        });
        this.ws = ws;
    }
    resolveDomain(params) {
        const { version } = params;
        return constants_1.MODEL_VERSION_TO_DOMAIN[version];
    }
    genRequestBody(params) {
        const { messages, temperature, topK, maxTokens, chatId, uid } = params;
        const domain = this.resolveDomain({ version: this.version });
        const requestBody = {
            header: {
                app_id: this.appId,
                uid: uid
            },
            parameter: {
                chat: {
                    domain,
                    temperature,
                    max_tokens: maxTokens,
                    top_k: topK,
                    chat_id: chatId
                }
            },
            payload: {
                message: {
                    text: messages
                }
            }
        };
        return requestBody;
    }
    send(params) {
        const { requestBody } = params;
        const requestBodyStr = JSON.stringify(requestBody);
        this.status = types_1.StatusEnum.PENDING;
        this.ws.send(requestBodyStr);
    }
    handleWSMessage(params) {
        var _a, _b;
        const { responseBody } = params;
        const { header: { status } } = responseBody;
        if (status === types_1.ResponseMessageStatusEnum.FIRST_SEGMENT) {
            this.cache = responseBody;
        }
        else if (status === types_1.ResponseMessageStatusEnum.MIDDLE_SEGMENT
            || status === types_1.ResponseMessageStatusEnum.LAST_SEGMENT) {
            const textObj = (_a = this.cache.payload.choices) === null || _a === void 0 ? void 0 : _a.text[0];
            const preContent = textObj.content;
            const curContent = preContent + ((_b = responseBody.payload.choices.text) === null || _b === void 0 ? void 0 : _b[0].content);
            textObj.content = curContent;
        }
        if (status === types_1.ResponseMessageStatusEnum.LAST_SEGMENT) {
            const usage = responseBody.payload.usage;
            this.cache.payload.usage = usage;
            this.status = types_1.StatusEnum.DISCONNECTED;
            this.emitter.emit('finish');
        }
    }
    chat(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { messages, temperature, topK, maxTokens, chatId, uid } = params;
            const requestBody = this.genRequestBody({
                messages,
                temperature,
                topK,
                maxTokens,
                chatId,
                uid
            });
            const promise = new Promise((resolve, reject) => {
                if (this.streamMode) {
                    this.responseStream = new reponse_stream_1.ResponseStream();
                }
                if (this.status === types_1.StatusEnum.PENDING) {
                    reject('wating last chat reply...');
                }
                if (this.status === types_1.StatusEnum.DISCONNECTED) {
                    this.initWebSocket({
                        onOpen: () => {
                            this.send({ requestBody });
                        }
                    });
                }
                else if (this.status === types_1.StatusEnum.CONNECTED) {
                    this.send({ requestBody });
                }
                if (this.streamMode) {
                    resolve(this.responseStream);
                }
                else {
                    this.emitter.once('finish', () => {
                        resolve(this.cache);
                    });
                }
            });
            return promise;
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map