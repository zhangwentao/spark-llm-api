const { Client } = require('../lib')
const {
  APIKey,
  APISecret,
  APPID
} = process.env

const client = new Client({
  apiKey: APIKey,
  apiSecret: APISecret,
  appId: APPID
})

client.chat({messages:[
  {
    role: 'user',
    content: 'hello'
  }
]})