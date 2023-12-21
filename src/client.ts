import { EventEmitter } from 'events'
import { WebSocket } from 'ws'
import {
  Message,
  RequestBody,
  Domain,
  DomainEnum,
  Constants,
  Status,
  StatusEnum,
  ResponseBody,
  ResponseMessageStatus,
  ResponseMessageStatusEnum
} from './types'
import { getAuthorizedURL } from './authorization'
import { rejects } from 'assert'

class Client extends EventEmitter {
  private url: string
  private ws: WebSocket
  private status: Status
  private appId: string
  private version: string
  private cache: ResponseBody
  private emitter: EventEmitter
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
    this.status = StatusEnum.DISCONNECTED
    this.emitter = new EventEmitter()

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
    if (this.ws) {
      this.ws.removeAllListeners()
    }
    const {onOpen} = params
    const ws = new WebSocket(this.url)
    ws.on('error', (err) => {
      console.log(err)
    });
    ws.on('close', (code, reason) => {
      // console.error('closed')
      // console.log(code, reason.toString('utf-8'))
    })
    ws.on('open', () => {
      // console.info('websocket established')
      this.status = StatusEnum.CONNECTED
      onOpen && onOpen()
    });

    ws.on('message', (data) => {
      const dataStr = data.toString('utf-8')
      const dataObj = JSON.parse(dataStr)
      this.handleWSMessage({ responseBody: dataObj})
    })

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

  private send(params: {
    requestBody: RequestBody
  }) {
    const { requestBody } = params
    const requestBodyStr = JSON.stringify(requestBody)
    this.status = StatusEnum.PENDING
    this.ws.send(requestBodyStr)

  }

  private handleWSMessage(params: {
    responseBody: ResponseBody
  }) {
    const { responseBody } = params
    const { header: { status }} = responseBody
    if (status === ResponseMessageStatusEnum.FIRST_SEGMENT) {
      this.cache = responseBody
    } else if (
        status === ResponseMessageStatusEnum.MIDDLE_SEGMENT
        || status === ResponseMessageStatusEnum.LAST_SEGMENT
      ) {
      const textObj = this.cache.payload.choices?.text[0]
      const preContent = textObj.content
      const curContent = preContent + responseBody.payload.choices.text?.[0].content
      textObj.content = curContent
    }
    if (status === ResponseMessageStatusEnum.LAST_SEGMENT) {
      const usage = responseBody.payload.usage
      this.cache.payload.usage = usage
      this.status = StatusEnum.DISCONNECTED
      this.emitter.emit('finish')
    }
  }

  public async chat(params: {
    messages: Array<Message>
    temperature?: number
    topK?: number
    maxTokens?: number
    chatId?: string
    uid?: string
  }): Promise<ResponseBody> {
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
    const promise = new Promise<ResponseBody>((resolve, reject) => {
      if (this.status === StatusEnum.PENDING) {
        reject('wating last chat reply...')
      }
      if (this.status === StatusEnum.DISCONNECTED) {
        this.initWebSocket({
          onOpen:() => {
            this.send({requestBody})
          }
        })
      } else if (this.status === StatusEnum.CONNECTED) {
          this.send({requestBody})
      }
      this.emitter.once('finish', () => {
        resolve(this.cache)
      })
    })
    return promise
  }
}

export {
  Client
}