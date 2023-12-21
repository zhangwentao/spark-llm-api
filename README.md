# spark-llm-api

this npm module use for intereact to **讯飞星火** LLM [API](https://www.xfyun.cn/doc/spark/Web.html).

## usage

### install

```bash
npm i spark-llm-api
```

### step

#### 1.import and create a Client instance

```javascript
const { Client } = require('spark-llm-api')
const client = new Client({
  apiKey: '',
  apiSecret: '',
  appId: ''
})
```

#### 2.chat and get response

```javascript
  const response = await client.chat({
    messages: [
      {
        role: 'user',
        content: 'hello'
      }
    ]
  })
```

## more

more detail please read demo in codes
