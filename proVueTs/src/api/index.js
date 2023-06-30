// import { ChatGPTAPIBrowser } from 'chatgpt'
// console.log(ChatGPTAPIBrowser)
// const api = new ChatGPTAPIBrowser({
//   email: '872349679@qq.com',
//   password: '135031hang'
// })
// await api.initSession()

// const result = await api.sendMessage('Hello World!')
// console.log(result.response)

import { ChatGPTAPI } from 'chatgpt'

async function example() {
  const api = new ChatGPTAPI({
    apiKey: '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'
  })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}
example();