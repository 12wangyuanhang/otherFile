<!-- <template>
    <div>
        <el-icon size="20">
            <IEpMinus/>
            <IEpPlus/>
        </el-icon>
        
    </div>
</template> -->

<script lang="tsx">
import { ref, defineComponent, onMounted, reactive } from 'vue';
import requst from '@/api/request'
import type { TabsPaneContext } from 'element-plus'

export default defineComponent({
    setup(){
        

        const activeName = ref('first')
        const dialogVisible = ref<Boolean>(false)
        const dialogConfig = reactive({
            title: 'Tips',
            width: '80%'
        })
        const handleClick = (tab: TabsPaneContext, event: Event) => {
            console.log(tab, event)
        }
        const handleDialog = () => {
            
        }
        const getDetail = async () => {
            dialogVisible.value = true;
            const res = await requst.request({
                url: '/api/hotlist?type=huPu',
                method: 'get',
            });
            console.log(res, 'res');
        }
        const handleClose = (done:any) => {
            done()
        }
        let apiUrl = 'https://api.vvhan.com/api/hotlist'
        const hotList = [
            {
                apiUrl: 'huPu',
                name: '虎扑步行街'
            },{
                apiUrl: 'zhihuHot',
                name: '知乎热榜'
            },{
                name: '哔哩哔哩',
                apiUrl: 'bili',
            },{
                name: '百度热点',
                apiUrl: 'baiduRD',
            },{
                name: '贴吧热议',
                apiUrl: 'baiduRY'
            },{
                name: '抖音热点',
                apiUrl: 'douyinHot'
            }
        ]
        onMounted(()=>{
            
        })
        const footerSlot = {
            footer: () => (
                <>
                    <span class="dialog-footer">
                        <el-button onClick={()=>dialogVisible.value = false}>Cancel</el-button>
                        <el-button type="primary" onClick={()=>dialogVisible.value = false}>submit</el-button>
                    </span>
                </>
            )
        }
        return () => (
            <>
                {/* <h2 class="text-get">我是一个会动态出现的文字, 可炫酷了。</h2> */}
                <el-button onClick={()=>handleDialog}>dialog</el-button>
                <el-col span={8}>
                    <el-card body-style={{padding: '0px' }}>
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" />
                        <div style="padding: 14px;">
                            <span>好吃的汉堡</span>
                            <div class="bottom clearfix">
                                <el-button onClick={() => getDetail()} type="text" class="button">查看详情</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-dialog
                    v-model={dialogVisible.value}
                    onBefore-close={handleClose}
                    v-slots={footerSlot}
                    {...dialogConfig}
                    close-on-click-modal={false}
                >
                    <span>This is a message</span>
                    
                </el-dialog>
            </>
        ) 
    }
})


</script>


<style lang="scss" scoped>
    .text-get {
        font: bold 100% Consolas, Monaco, monospace;
        border-right: 4px solid;
        width: fit-content;
        white-space: nowrap;
        overflow: hidden;
        animation: typing 4s steps(25, end),
        cursor-blink 0.3s step-end infinite alternate;
    }
    @keyframes typing {
        from {
            width: 0;
        }
    }

    @keyframes cursor-blink {
        50% {
            border-color: transparent;
        }
    }
</style>