const getAuthorization = (params) => {
}

module.exports = {
  getAuthorization
}

const crypto = require('crypto')
const APISecret = ''
const APIKey = ''
const dateStr = (new Date).toUTCString()

let tmp = ''
tmp = "host: " + "spark-api.xf-yun.com" + "\n"
tmp += "date: " + dateStr + "\n"
tmp += "GET " + "/v3.1/chat" + " HTTP/1.1"


const signature = crypto.createHmac('sha256', APISecret)
  .update(tmp)
  .digest('base64')

console.log(signature)

const authorization_origin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
console.log(authorization_origin)

const authorization = Buffer.from(authorization_origin, 'utf-8').toString('base64');

console.log(authorization)

const url = require('url');

const v = {
  authorization: authorization, // 上方鉴权生成的authorization
  date: dateStr, // 步骤1生成的date
  host: 'spark-api.xf-yun.com', // 请求的主机名，根据具体接口替换
};

const urlStr = 'wss://spark-api.xf-yun.com/v3.1/chat' + url.format({ query: v });
console.log(urlStr)
const { WebSocket } = require('ws')

const ws = new WebSocket(urlStr)
ws.on('error', (err) => {
  console.log(err)
});

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});
