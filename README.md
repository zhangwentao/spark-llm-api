# spark-llm-api

**讯飞星火**大模型API调用Node.js SDK,
支持星火大模型目前开放的全部大模型[接口](https://www.xfyun.cn/doc/spark/Web.html)（V1.5/V2.0/V3.0）的调用。

## 功能

目前支持大模型接口数据的非流式返回，即SDK会把每个接口调用的返回的数据流组装成一个数据返回，这为开发者提供了一种最简便的使用方式。

后续也会支持大模型接口数据的流式返回。

## 使用方式

### 安装

```bash
npm i spark-llm-api
```

### 具体步骤

#### 注册

使用前需要先注册讯飞星火的账号，目前账号支持200万的免费token。

#### 1.引入SKD中的`Client`类并进行实例化

```javascript
const { Client } = require('spark-llm-api')
const client = new Client({
  // 在讯飞星火注册并创建应用后的相关密钥
  apiKey: '',
  apiSecret: '',
  appId: ''
})
```

#### 2.通过`chat()`方法调用大模型接口获取大模型返回的数据

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

## 更多

请参考代码库中的demo目录，查看使用示例。
SDK的更多详细参数后续更新。

## English version

[manual](./README-EN.md)
