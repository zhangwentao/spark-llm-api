interface Message {
  role: 'user' | 'assistant'
  content: string
}
interface RequestBody {
  header: {
    app_id: string
    uid?: string
  },
  parameter: {
    chat: {
      domain: 'general' | 'generalv2' | 'generalv3'
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
  RequestBody
}