<template>
  <div class="main-container">
    <btn-model class="floating" @click="openDreawer">特效</btn-model>
    <el-drawer v-model="drawer2" :direction="direction">
        <template #header>
            <h4>Special Effect Select</h4>
        </template>
        <template #default>
            <div>
                <el-radio-group v-model="radio" @change="radioChange">
                    <el-radio :label="3">爱心</el-radio>
                    <el-radio :label="6">波纹</el-radio>
                    <el-radio :label="9">星星拖尾</el-radio>
                    <el-radio :label="15">气泡拖尾</el-radio>
                    <el-radio :label="18">emoji</el-radio>
                    <el-radio :label="0">关闭特效</el-radio>
                </el-radio-group>
                <el-divider>
                    <el-icon><IEpstar-filled /></el-icon>
                </el-divider>
                <m-button type="primary" @click="checkEffects('1')">满屏樱花</m-button>
                <m-button type="success" @click="checkEffects('2')">蜘蛛网特效</m-button>
            </div>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">cancel</el-button>
                <el-button type="primary" @click="confirmClick">confirm</el-button>
            </div>
        </template>
    </el-drawer>
    <router-view></router-view>
  </div>
</template>

<script setup lang="tsx">
import { ref, nextTick } from 'vue';
import { getLoveSpecial, cancelSpecial, getFireworks, getFairyDustCursor, getSakura, getBubblesCursor, getEmojiCursor, getSpiderEffects } from './utils/special';

import BtnModel from '@/components/ButtonModel/index.vue'

type SpecialEffectObj = { [key: string]: () => void };

const direction = ref('ltr')
const drawer2 = ref(false);
const radio = ref()

const openDreawer = () => {
    drawer2.value = true;
}
// class A {
//     constructor(){
//         this.name = 1234
//     }
//     add(){
//         console.log(this.name)
//     }
// }
// let b = new A();
// console.log(b.add())
const checkEffects = (check:string) => {
    switch(check){
        case '1':
            getSakura()
            break;
        case '2':
            getSpiderEffects();
            break;
    }
}
const specialEffectObj:SpecialEffectObj = {
    '3': getLoveSpecial,
    '6': getFireworks,
    '9': getFairyDustCursor,
    '12': getSakura,
    '15': getBubblesCursor,
    '18': getEmojiCursor,
    '21': getSpiderEffects,
    '0': cancelSpecial
}
const radioChange = (val:string) => {
    // let sd = new CD();
    // console.log(sd.getData(), 4313);
    // Test.getLoveSpecial()
    nextTick(()=>{
        specialEffectObj[val]()
    })
    // console.log(val)
}
function cancelClick() {
  drawer2.value = false
}
function confirmClick() {
    drawer2.value = false

}
</script>
<style lang="scss" scoped>
.main-container {

}
.floating {
    position: fixed!important;
    right: 40px;
    bottom: 30px;
    z-index: 3000;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
