import { Transform } from 'stream'
import { ResponseBody } from './types'

class ResponseStream extends Transform {
  public constructor() {
    super({
      writableObjectMode: true,
      readableObjectMode: true
    })
  }

  _transform(trunk:ResponseBody, encoding, callback) {
    this.push(trunk)
    callback()
  }
}

export {
  ResponseStream
}