const { Client } = require('../../lib')
const { prompt } = require('./data')
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
  // const result = await client.chat({
  //   maxTokens: 8193,
  //   messages:[
  //     {
  //       role: 'user',
  //       content: prompt
  //     }
  //   ]
  // })

  const result = await client.chat({
    maxTokens: 8192,
    messages:[
      {
        role: 'user',
        content: 'hello'
      }
    ]
  })
  console.log(result.payload.choices.text?.[0].content)
  console.log(result)
}

main()

