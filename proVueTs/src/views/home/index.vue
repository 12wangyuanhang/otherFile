<script lang="tsx">
import { h, resolveComponent, getCurrentInstance, ref } from 'vue';
import { ChatDotRound, Guide } from '@element-plus/icons-vue';
import type { TabsPaneContext } from 'element-plus'
import { useRouter } from 'vue-router'
export default {
    components: {
        ChatDotRound,
        Guide
    },
    setup(){
        const { proxy }:any = getCurrentInstance()
        const router = useRouter();
        const skeleton = () => {
            return {
                template: (<el-skeleton-item style="width: 240px; height: 240px" />)
            }
        }
        const paneSlot = (iconName:any) => {
            return {
                label: () => (
                    <span class="custom-tabs-label">
                        <el-icon>{h(resolveComponent(iconName.iconName))}</el-icon>
                        <span>{iconName.label}</span>                        
                    </span>
                )
            }
        }
        const activeName = ref('/home/chatGPT')
        const tabChange = (path:string) => {
            console.log(path)
            router.push(path)
        }
        const handleClick = (tab: TabsPaneContext, event: Event) => {
            console.log(tab, event)
        }
        const routerList = [
            {
                label: 'charGpt',
                iconName: 'ChatDotRound',
                path: '/home/chatGPT',
            },{
                label: 'news',
                iconName: 'Guide',
                path: '/home/news',
            }
        ]
        const a = () =>{
            console.log(1)
        }
        return() => (
            <>
                <el-tabs v-model={activeName.value} onTabChange={tabChange} type="card" class="demo-tabs">
                    
                    {
                        routerList.map((item)=>{
                            return (
                                <el-tab-pane  name={item.path} v-slots={paneSlot(item)}>
                                    <div class="main-continer">
                                        <router-view />
                                    </div>
                                </el-tab-pane>
                            )
                        })
                    }
                    
                </el-tabs>
            </>
        )
    }
}
</script>

<style lang="scss" scoped>
// .demo-tabs {
//     border-bottom: 1px solid #e4e7ed;
// }
.main-continer {
    width: calc(100vw - 294px);
    height: calc(100vh - 139px);
}
.demo-tabs > :deep(.el-tabs__content) {
  padding: 32px 147px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs {
    :deep(.el-tabs__nav) {
        margin-left: 16%;
    }
    :deep(.el-tabs__item) {
        height: 60px;
        line-height: 60px;
    }
    :deep(.el-tabs__header) {
        border-bottom: 1px solid #e4e7ed;
        box-sizing: border-box;
        height: 60px;
    }
}



.custom-tabs-label {
    display: flex;
    align-items: center;
    >span {
        padding: 0 0 0 10px;
    }
}
</style>