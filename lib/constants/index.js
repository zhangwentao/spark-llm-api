"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODEL_VERSION_TO_DOMAIN = exports.DEFAULT_API_HOST = exports.DEFAULT_API_PROTOCOL = exports.DEFAULT_MODEL_VERSION = exports.MODEL_VERSION_STR_IN_API = void 0;
const types_1 = require("../types");
const MODEL_VERSION_STR_IN_API = {
    [types_1.ModelVersionEnum.V1_5]: 'v1.1',
    [types_1.ModelVersionEnum.V2_0]: 'v2.1',
    [types_1.ModelVersionEnum.V3_0]: 'v3.1'
};
exports.MODEL_VERSION_STR_IN_API = MODEL_VERSION_STR_IN_API;
const DEFAULT_MODEL_VERSION = types_1.ModelVersionEnum.V3_0;
exports.DEFAULT_MODEL_VERSION = DEFAULT_MODEL_VERSION;
const DEFAULT_API_PROTOCOL = types_1.APIProtocolEnum.WSS;
exports.DEFAULT_API_PROTOCOL = DEFAULT_API_PROTOCOL;
const DEFAULT_API_HOST = 'spark-api.xf-yun.com';
exports.DEFAULT_API_HOST = DEFAULT_API_HOST;
const MODEL_VERSION_TO_DOMAIN = {
    [types_1.ModelVersionEnum.V1_5]: types_1.DomainEnum.GENERAL,
    [types_1.ModelVersionEnum.V2_0]: types_1.DomainEnum.GENERAL_V2,
    [types_1.ModelVersionEnum.V3_0]: types_1.DomainEnum.GENERAL_V3
};
exports.MODEL_VERSION_TO_DOMAIN = MODEL_VERSION_TO_DOMAIN;
//# sourceMappingURL=index.js.map