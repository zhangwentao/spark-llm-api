import { createHmac } from 'crypto'
import { format } from 'url'
import { Constants } from './types'
const getAuthorizedURL = (params: {
  apiSecret: string
  apiKey: string
  version?: string
  protocal?: string
  host?: string
}) => {
  const {
    apiSecret,
    apiKey,
    version = Constants.DEFAULT_VERSION,
    protocal = Constants.DEFAULT_PROTOCAL,
    host = Constants.DEFAULT_HOST
  } = params

  const dateStr = (new Date).toUTCString()

  const tmp = ''
  + `host: ${host}\n`
  + `date: ${dateStr}\n`
  + `GET /${version}/chat HTTP/1.1`

  const signature = createHmac('sha256', apiSecret)
    .update(tmp)
    .digest('base64')

  const authorization_origin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`

  const authorization = Buffer
    .from(authorization_origin, 'utf-8')
    .toString('base64');

  const query = {
    authorization,
    date: dateStr,
    host,
  };

  const url = `${protocal}://${host}/${version}/chat${format({ query })}`

  return url
}

export {
  getAuthorizedURL
}
