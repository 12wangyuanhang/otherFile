<template>
    <div>
        <img src="./chat.svg" alt="">
        <!-- <button @click="toggleDark()">
            <i inline-block align-middle i="dark:carbon-moon carbon-sun" />

            <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
        </button> -->
        <button @click="toggleDark()">111111</button>
        <el-input @change="doChange" v-model="chatInput"></el-input>
        <div ref="chatText">124141</div>
        <!-- <component></component> -->
        <timeLoop></timeLoop>
        <!-- <e-button /> -->
    </div>
</template>

<script lang="tsx" setup>
import { ref, nextTick } from 'vue';
import type { Ref } from 'vue';

import axios from 'axios';
import type { TabsPaneContext } from 'element-plus'
import { useDark, useToggle } from '@vueuse/core'
import TimeLoop from '@/components/TimeLoop/index.vue'
// import EButton from '@/components/ButtonModel/index.vue'
import chatAi from './index'
// import { ChatGPTAPI } from 'chatgpt';
const chatInput = ref<string>('')
const chatText:Ref = ref()

let openKey = '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';



const isDark = useDark()
const toggleDark = useToggle(isDark)
const activeName = ref('first')

const doChange = async () => {
    // const api = new ChatGPTAPI({
    //     apiKey: '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'
    // })
    const localKey = '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';
    // const res = await api.sendMessage(chatInput.value);
    axios.post('/completions', {
        prompt: chatInput.value, max_tokens: 2048, model: "gpt-3.5-turbo"
    }, {
        headers: { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*",'Authorization': 'Bearer ' + localKey }
    }).then(response => { 
        chatText.value.innerHTML = response.data.choices[0].text 
    })
    // const res = await fetch(`https://api.openai.com/v1/completions`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${localKey}`
    //     },
    //     method: "POST",
    //     body: JSON.stringify({
    //       model: "gpt-3.5-turbo",
    //       promp: 'Say this is a test',
    //       temperature: 0,
    //       stop: '\n',
    //       // max_tokens: 4096 - tokens,
    //       stream: true
    //     })
    // }) 
    // console.log(chatAi())
    //   console.log(res)
}
// nextTick(()=>{
//     console.dir(chatText);
// })

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}


</script>