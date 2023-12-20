const {getAuthorizedURL} = require('../lib')

const url = getAuthorizedURL({
  APIKey: '',
  APISecret: ''
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