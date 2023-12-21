const {getAuthorizedURL} = require('../lib')
const {
  APIKey,
  APISecret,
} = process.env

const url = getAuthorizedURL({
  apiKey: APIKey,
  apiSecret: APISecret
})

const { WebSocket } = require('ws')

const ws = new WebSocket(url)
ws.on('error', (err) => {
  console.log(err)
});

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});