"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStream = void 0;
const stream_1 = require("stream");
class ResponseStream extends stream_1.Transform {
    constructor() {
        super({
            writableObjectMode: true,
            readableObjectMode: true
        });
    }
    _transform(trunk, encoding, callback) {
        this.push(trunk);
        callback();
    }
}
exports.ResponseStream = ResponseStream;
//# sourceMappingURL=reponse-stream.js.map