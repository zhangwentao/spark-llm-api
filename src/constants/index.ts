import {
  ModelVersion,
  ModelVersionEnum,
  APIProtocol,
  APIProtocolEnum,
  Domain,
  DomainEnum
} from '../types'

const MODEL_VERSION_STR_IN_API  = {
  [ModelVersionEnum.V1_5]: 'v1.1',
  [ModelVersionEnum.V2_0]: 'v2.1',
  [ModelVersionEnum.V3_0]: 'v3.1'
}

const DEFAULT_MODEL_VERSION: ModelVersion= ModelVersionEnum.V3_0
const DEFAULT_API_PROTOCOL: APIProtocol = APIProtocolEnum.WSS
const DEFAULT_API_HOST: string = 'spark-api.xf-yun.com'

const MODEL_VERSION_TO_DOMAIN: Record<ModelVersion, Domain> = {
  [ModelVersionEnum.V1_5]: DomainEnum.GENERAL,
  [ModelVersionEnum.V2_0]: DomainEnum.GENERAL_V2,
  [ModelVersionEnum.V3_0]: DomainEnum.GENERAL_V3
}

export {
  MODEL_VERSION_STR_IN_API,
  DEFAULT_MODEL_VERSION,
  DEFAULT_API_PROTOCOL,
  DEFAULT_API_HOST,
  MODEL_VERSION_TO_DOMAIN
}