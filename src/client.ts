import { EventEmitter } from 'events'
import { WebSocket } from 'ws'
import {
  Message,
  RequestBody,
  Domain,
  DomainEnum,
  Constants,
  Status,
  StatusEnum
} from './types'
import { getAuthorizedURL } from './authorization'

class Client extends EventEmitter {
  private url: string
  private ws: WebSocket
  private status: Status
  private appId: string
  private version: string
  constructor(params: {
    apiKey: string
    apiSecret: string
    appId: string
    version?: string
    protocal?: string
    host?: string
  }) {
    super()
    const {
      apiKey,
      apiSecret,
      appId,
      version = Constants.DEFAULT_VERSION,
      protocal = Constants.DEFAULT_PROTOCAL,
      host = Constants.DEFAULT_HOST
    } = params

    this.appId = appId
    this.version = version
    this.status = StatusEnum.INACTIVE

    this.url = getAuthorizedURL({
      apiKey,
      apiSecret,
      version,
      protocal,
      host
    })
  }

  private initWebSocket (params: {
    onOpen: () => any
  }) {
    const {onOpen} = params
    const ws = new WebSocket(this.url)
    ws.on('error', (err) => {
      console.log(err)
    });

    ws.on('open', () => {
      console.info('websocket established')
      this.status = StatusEnum.ACTIVE
      onOpen && onOpen()
    });

    ws.on('message', (data) => {
      console.log('received: %s', data);
    });

    this.ws = ws
  }

  private resolveDomain(params: {
    version: string
  }): Domain {
    const {version} = params
    const mainVersion = version.match(/v(\d)\.\d*/)?.[1]
    let domain
    switch (mainVersion) {
      case '1':
        domain = DomainEnum.GENERAL
        break
      case '2':
        domain = DomainEnum.GENERAL_V2
        break
      case '3':
        domain = DomainEnum.GENERAL_V3
        break
    }
    return domain
  }

  private genRequestBody(params: {
    messages: Array<Message>
    temperature?: number
    topK?: number
    maxTokens?: number
    chatId?: string
    uid?: string
  }): RequestBody {
    const {
      messages,
      temperature,
      topK,
      maxTokens,
      chatId,
      uid
    } = params
    const domain = this.resolveDomain({version: this.version})
    const requestBody: RequestBody = {
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
    }
    return requestBody
  }

  public chat(params: {
    messages: Array<Message>
    temperature?: number
    topK?: number
    maxTokens?: number
    chatId?: string
    uid?: string
  }) {
    const {
      messages,
      temperature,
      topK,
      maxTokens,
      chatId,
      uid
    } = params
    const requestBody = this.genRequestBody({
      messages,
      temperature,
      topK,
      maxTokens,
      chatId,
      uid
    })
    if (this.status === StatusEnum.INACTIVE) {
      this.initWebSocket({
        onOpen: ():void => {
          this.ws.send(JSON.stringify(requestBody))
        }
      })
    } else if (this.status === StatusEnum.ACTIVE) {
      this.ws.send(JSON.stringify(requestBody))
    }
  }
}

export {
  Client
}