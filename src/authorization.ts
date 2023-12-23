import { createHmac } from 'crypto'
import { format } from 'url'
import {
  DEFAULT_MODEL_VERSION,
  DEFAULT_API_HOST,
  DEFAULT_API_PROTOCOL,
  MODEL_VERSION_STR_IN_API
} from './constants'
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
    version = DEFAULT_MODEL_VERSION,
    protocal = DEFAULT_API_PROTOCOL,
    host = DEFAULT_API_HOST
  } = params

  const dateStr = (new Date).toUTCString()

  const versionStr = MODEL_VERSION_STR_IN_API[version]

  const tmp = ''
  + `host: ${host}\n`
  + `date: ${dateStr}\n`
  + `GET /${versionStr}/chat HTTP/1.1`

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

  const url = `${protocal}://${host}/${versionStr}/chat${format({ query })}`

  return url
}

export {
  getAuthorizedURL
}
