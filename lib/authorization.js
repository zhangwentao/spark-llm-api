"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorizedURL = void 0;
const crypto_1 = require("crypto");
const url_1 = require("url");
const types_1 = require("./types");
const getAuthorizedURL = (params) => {
    const { apiSecret, apiKey, version = types_1.Constants.DEFAULT_VERSION, protocal = types_1.Constants.DEFAULT_PROTOCAL, host = types_1.Constants.DEFAULT_HOST } = params;
    const dateStr = (new Date).toUTCString();
    const tmp = ''
        + `host: ${host}\n`
        + `date: ${dateStr}\n`
        + `GET /${version}/chat HTTP/1.1`;
    const signature = (0, crypto_1.createHmac)('sha256', apiSecret)
        .update(tmp)
        .digest('base64');
    const authorization_origin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
    const authorization = Buffer
        .from(authorization_origin, 'utf-8')
        .toString('base64');
    const query = {
        authorization,
        date: dateStr,
        host,
    };
    const url = `${protocal}://${host}/${version}/chat${(0, url_1.format)({ query })}`;
    return url;
};
exports.getAuthorizedURL = getAuthorizedURL;
//# sourceMappingURL=authorization.js.map