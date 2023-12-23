declare enum ModelVersionEnum {
    V1_5 = "v1.5",
    V2_0 = "v2.0",
    V3_0 = "v3.0"
}
type ModelVersion = ModelVersionEnum.V1_5 | ModelVersionEnum.V2_0 | ModelVersionEnum.V3_0;
declare enum APIProtocolEnum {
    WSS = "wss",
    WS = "ws"
}
type APIProtocol = APIProtocolEnum.WS | APIProtocolEnum.WSS;
declare enum StatusEnum {
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    PENDING = "pending"
}
type Status = StatusEnum.CONNECTED | StatusEnum.DISCONNECTED | StatusEnum.PENDING;
declare enum RoleEnum {
    USER = "user",
    ASSISTANT = "assistant"
}
type Role = RoleEnum.ASSISTANT | RoleEnum.USER;
interface Message {
    role: Role;
    content: string;
}
declare enum DomainEnum {
    GENERAL = "general",
    GENERAL_V2 = "generalv2",
    GENERAL_V3 = "generalv3"
}
type Domain = DomainEnum.GENERAL | DomainEnum.GENERAL_V2 | DomainEnum.GENERAL_V3;
interface RequestBody {
    header: {
        app_id: string;
        uid?: string;
    };
    parameter: {
        chat: {
            domain: Domain;
            temperature?: number;
            max_tokens?: number;
            top_k?: number;
            chat_id?: string;
        };
    };
    payload: {
        message: {
            text: Array<Message>;
        };
    };
}
declare enum ResponseMessageStatusEnum {
    FIRST_SEGMENT = 0,
    MIDDLE_SEGMENT = 1,
    LAST_SEGMENT = 2
}
type ResponseMessageStatus = ResponseMessageStatusEnum.FIRST_SEGMENT | ResponseMessageStatusEnum.MIDDLE_SEGMENT | ResponseMessageStatusEnum.LAST_SEGMENT;
interface Usage {
    question_tokens: number;
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}
interface ResponseBody {
    header: {
        code: number;
        message: string;
        sid: string;
        status: ResponseMessageStatus;
    };
    payload: {
        choices: {
            status: ResponseMessageStatus;
            seq: number;
            text: Array<Message>;
        };
        usage?: {
            text: Usage;
        };
    };
}
export type { Message, Role, Domain, RequestBody, Status, Usage, ResponseMessageStatus, ResponseBody, ModelVersion, APIProtocol };
export { RoleEnum, DomainEnum, StatusEnum, ResponseMessageStatusEnum, ModelVersionEnum, APIProtocolEnum };
//# sourceMappingURL=index.d.ts.map