
enum Constants {
  DEFAULT_VERSION = 'v3.1',
  DEFAULT_PROTOCAL = 'ws',
  DEFAULT_HOST = 'spark-api.xf-yun.com'
}

enum RoleEnum {
  USER = 'user',
  ASSISTANT = 'assistant'
}


type Role = RoleEnum.ASSISTANT | RoleEnum.USER
interface Message {
  role: Role
  content: string
}

enum DomainEnum {
  GENERAL = 'general',
  GENERAL_V2 = 'generalv2',
  GENERAL_V3 = 'generalv3',
}

type Domain = DomainEnum.GENERAL | DomainEnum.GENERAL_V2 | DomainEnum.GENERAL_V3

interface RequestBody {
  header: {
    app_id: string
    uid?: string
  },
  parameter: {
    chat: {
      domain: Domain
      temperature?: number
      max_tokens?: number
      top_k?: number
      chat_id?: string
    }
  },
  payload: {
    message: {
      text: Array<Message>
    }
  }
}

export type {
  Message,
  Role,
  Domain,
  RequestBody
}

export {
  Constants,
  RoleEnum,
  DomainEnum
}