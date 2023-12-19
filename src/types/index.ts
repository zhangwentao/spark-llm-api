interface SparkMessage {
  role: 'user' | 'assistant'
  content: string
}
interface SparkRequestBody {
  header: {
    app_id: string
    uid?: string
  },
  parameter: {
    chat: {
      domain: 'general'|'generalv2'|'generalv3'
      temperature?: number
      max_tokens?: number
      top_k?: number
      chat_id?: string
    }
  },
  payload: {
    message: {
      text: Array<SparkMessage>
    }
  }
}

export type {
  SparkMessage,
  SparkRequestBody
}