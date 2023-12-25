const { Writable } = require('stream')
const { Client } = require('../lib')
const {
  APIKey,
  APISecret,
  APPID
} = process.env

const client = new Client({
  apiKey: APIKey,
  apiSecret: APISecret,
  appId: APPID,
  streamMode: true
})

class SimpleWriable extends Writable {
  constructor() {
    super({
      objectMode: true
    })
  }
  _write(trunk, encoding, callback) {
    const content = trunk.payload.choices.text?.[0].content
    process.stdout.write(content, () => {
      callback()
    })
  }
}

const main = async() => {
  const sw = new SimpleWriable()
  const result = await client.chat({messages:[
    {
      role: 'user',
      content: '请给我详细介绍一下React,并提供一个代码示例'
    }
  ]})
  result.pipe(sw)
}

main()

