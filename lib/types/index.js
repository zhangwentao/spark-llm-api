"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIProtocolEnum = exports.ModelVersionEnum = exports.ResponseMessageStatusEnum = exports.StatusEnum = exports.DomainEnum = exports.RoleEnum = void 0;
var ModelVersionEnum;
(function (ModelVersionEnum) {
    ModelVersionEnum["V1_5"] = "v1.5";
    ModelVersionEnum["V2_0"] = "v2.0";
    ModelVersionEnum["V3_0"] = "v3.0";
})(ModelVersionEnum || (exports.ModelVersionEnum = ModelVersionEnum = {}));
var APIProtocolEnum;
(function (APIProtocolEnum) {
    APIProtocolEnum["WSS"] = "wss";
    APIProtocolEnum["WS"] = "ws";
})(APIProtocolEnum || (exports.APIProtocolEnum = APIProtocolEnum = {}));
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