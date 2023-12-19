import { createHmac } from 'crypto'
import { format } from 'url'
const getAuthorizedURL = (params: {
  APISecret: string
  APIKey: string
  version?: string
  protocal?: string
  host?: string
}) => {
  const {
    APISecret,
    APIKey,
    version = 'v3.1',
    protocal = 'ws',
    host = 'spark-api.xf-yun.com'
  } = params

  const dateStr = (new Date).toUTCString()

  const tmp = ''
  + `host: ${host}\n`
  + `date: ${dateStr}\n`
  + `GET /${version}/chat HTTP/1.1`

  const signature = createHmac('sha256', APISecret)
    .update(tmp)
    .digest('base64')

  const authorization_origin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`

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
