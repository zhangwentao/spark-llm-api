"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMessageStatusEnum = exports.StatusEnum = exports.DomainEnum = exports.RoleEnum = exports.Constants = void 0;
var Constants;
(function (Constants) {
    Constants["DEFAULT_VERSION"] = "v3.1";
    Constants["DEFAULT_PROTOCAL"] = "wss";
    Constants["DEFAULT_HOST"] = "spark-api.xf-yun.com";
})(Constants || (exports.Constants = Constants = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["CONNECTED"] = "connected";
    StatusEnum["DISCONNECTED"] = "disconnected";
    StatusEnum["PENDING"] = "pending";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["USER"] = "user";
    RoleEnum["ASSISTANT"] = "assistant";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
var DomainEnum;
(function (DomainEnum) {
    DomainEnum["GENERAL"] = "general";
    DomainEnum["GENERAL_V2"] = "generalv2";
    DomainEnum["GENERAL_V3"] = "generalv3";
})(DomainEnum || (exports.DomainEnum = DomainEnum = {}));
var ResponseMessageStatusEnum;
(function (ResponseMessageStatusEnum) {
    ResponseMessageStatusEnum[ResponseMessageStatusEnum["FIRST_SEGMENT"] = 0] = "FIRST_SEGMENT";
    ResponseMessageStatusEnum[ResponseMessageStatusEnum["MIDDLE_SEGMENT"] = 1] = "MIDDLE_SEGMENT";
    ResponseMessageStatusEnum[ResponseMessageStatusEnum["LAST_SEGMENT"] = 2] = "LAST_SEGMENT";
})(ResponseMessageStatusEnum || (exports.ResponseMessageStatusEnum = ResponseMessageStatusEnum = {}));
//# sourceMappingURL=index.js.map