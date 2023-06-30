<script lang="tsx">
import { ref, h, resolveComponent } from 'vue';
import type { Ref } from 'vue';
// type lenT = T => T
export default {
    
    setup(){
        
        // function lengthOfLIS(nums){
        //     let len = [];
        //     const fn = (arr, i) => {
        //         len[i] = 1
        //         for(let j = 0; j < i; j++) {
        //             if(arr[i] > arr[j]){
        //                 len[i] =  Math.max(len[i], len[j]+1)
        //                 console.log(len[i], i, len)
        //             }
        //         }
        //         if(i < arr.length){
        //             console.log(i,'11111111')
        //             i++
        //             fn(arr, i)
        //         }
        //     }
        //     fn(nums, 0)
        //     return Math.max(...len)
        // }
        // function subsequence(arr) {
        //     let arrTow = [] //存入第一个值
        //     let fn = (arr, i) => {
        //         arrTow[i] = [arr[i]]
        //         let newArr = [...arrTow[i]];
        //         // 以当前数为循环节点
        //         for(let j = 0; j < i; j++){
        //             if(arr[i] > arr[j]){
                        
        //                 // arrTow[i] = [...arrTow[i-1],arr[j]]
        //                 let arrS = [...arrTow[j], arr[j]]
        //                 if(){

        //                 }
        //             }
        //         }
        //         if(i < arr.length){
        //         i++
        //         fn(arr, i)
        //         }
                
        //     }
        //     fn(arr , 0);
        //     return arrTow
        // }
        const eInput:Ref<string> = ref('111')
        return ()=>(<>
            <el-input v-model={eInput.value}></el-input>
        </>)
    }
    // h(resolveComponent('el-input'), {id:'abc','value':eInput.value})
}
</script>

<!-- <template>
  <h1>{{ msg }}</h1>
    <div>{{devJsx()}}</div>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template> -->

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}
</style>
