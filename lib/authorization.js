"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorizedURL = void 0;
const crypto_1 = require("crypto");
const url_1 = require("url");
const constants_1 = require("./constants");
const getAuthorizedURL = (params) => {
    const { apiSecret, apiKey, version = constants_1.DEFAULT_MODEL_VERSION, protocal = constants_1.DEFAULT_API_PROTOCOL, host = constants_1.DEFAULT_API_HOST } = params;
    const dateStr = (new Date).toUTCString();
    const versionStr = constants_1.MODEL_VERSION_STR_IN_API[version];
    const tmp = ''
        + `host: ${host}\n`
        + `date: ${dateStr}\n`
        + `GET /${versionStr}/chat HTTP/1.1`;
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
    const url = `${protocal}://${host}/${versionStr}/chat${(0, url_1.format)({ query })}`;
    return url;
};
exports.getAuthorizedURL = getAuthorizedURL;
//# sourceMappingURL=authorization.js.map