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

const main = async() => {
  const result = await client.chat({messages:[
    {
      role: 'user',
      content: 'hello'
    }
  ]})
  console.log(result.payload.choices.text?.[0].content)

  const result2 = await client.chat({messages:[
    {
      role: 'user',
      content: '你好'
    }
  ]})

  console.log(result2.payload.choices.text?.[0].content)

  const result3 = await client.chat({messages:[
    {
      role: 'user',
      content: '你好'
    }
  ]})

  console.log(result3.payload.choices.text?.[0].content)
}

main()

