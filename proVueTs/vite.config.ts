import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), 
        vueJsx(),
        AutoImport({
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    prefix: 'Icon'
                })
            ],
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    enabledCollections: ['ep']
                })
            ],
        }),
        Icons({
            autoInstall: true,
            compiler: 'vue3'
        })
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] 
    },
    define: {
        'process.env': Object.assign(process.env,{BASE_URL:'测试'})
    },
    server: {
        port: 3001,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'https://api.vvhan.com',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ""),
            },
            '/snow': { // 匹配请求路径，localhost:3000/snow
                target: 'https://api.openai.com/v1/completions', // 代理的目标地址
                changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
                secure: true, // 是否https接口
                // ws: true, // 是否代理websockets
                // rewrite target目标地址 + '/abc'，如果接口是这样的，那么不用重写
                rewrite: (path) => path.replace(/^\/snow/, '') // 路径重写，本项目不需要重写
            }
        }
    }
})