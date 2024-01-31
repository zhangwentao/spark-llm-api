import { EventEmitter } from 'events'
import { WebSocket } from 'ws'
import {
  Message,
  RequestBody,
  Domain,
  APIProtocol,
  Status,
  StatusEnum,
  ResponseBody,
  ModelVersion,
  ResponseMessageStatusEnum
} from './types'
import {
  DEFAULT_API_HOST,
  DEFAULT_API_PROTOCOL,
  DEFAULT_MODEL_VERSION,
  MODEL_VERSION_TO_DOMAIN
} from './constants'
import { getAuthorizedURL } from './authorization'
import { ResponseStream } from './reponse-stream'

class Client extends EventEmitter {
  private url: string
  private ws: WebSocket
  private status: Status
  private appId: string
  private version: ModelVersion
  private cache: ResponseBody
  private emitter: EventEmitter
  private streamMode: boolean
  private responseStream: ResponseStream
  constructor(params: {
    apiKey: string
    apiSecret: string
    appId: string
    version?: ModelVersion
    protocal?: APIProtocol
    host?: string
    streamMode?: boolean
  }) {
    super()
    const {
      apiKey,
      apiSecret,
      appId,
      version = DEFAULT_MODEL_VERSION,
      protocal = DEFAULT_API_PROTOCOL,
      host = DEFAULT_API_HOST,
      streamMode = false
    } = params

    this.appId = appId
    this.version = version
    this.status = StatusEnum.DISCONNECTED
    this.streamMode = streamMode
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
      this.ws.terminate()
    }
    const {onOpen} = params
    const ws = new WebSocket(this.url)
    ws.on('error', (err) => {
      console.error(err)
      throw err
    });
    ws.on('close', (code, reason) => {
      console.info(code, reason.toString('utf-8'))
    })
    ws.on('open', () => {
      console.info('websocket established')
      this.status = StatusEnum.CONNECTED
      onOpen && onOpen()
    });

    ws.on('message', (data) => {
      const dataStr = data.toString('utf-8')
      const dataObj = JSON.parse(dataStr)
      if (this.streamMode) {
        this.responseStream.write(dataObj)
      } else {
        this.handleWSMessage({ responseBody: dataObj})
      }
    })

    this.ws = ws
  }

  private resolveDomain(params: {
    version: string
  }): Domain {
    const {version} = params
    return MODEL_VERSION_TO_DOMAIN[version]
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
    const { header: { status, code }} = responseBody
    if (code !== 0) {
      this.cache = responseBody
      this.emitter.emit('finish')
      return
    }
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
      this.cache.header = responseBody.header
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
  }): Promise<ResponseBody| ResponseStream> {
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
    const promise = new Promise<ResponseBody | ResponseStream>((resolve, reject) => {
      if (this.streamMode) {
        this.responseStream = new ResponseStream()
      }
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
      if (this.streamMode) {
        resolve(this.responseStream)
      } else {
        this.emitter.once('finish', () => {
          resolve(this.cache)
        })
      }
    })
    return promise
  }
}

export {
  Client
}