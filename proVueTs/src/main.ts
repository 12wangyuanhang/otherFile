import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from '@/router/index'
import 'element-plus/theme-chalk/dark/css-vars.css'
import Button from './components/button.vue';
console.log(router, 1231)
const app = createApp(App);
app.component('m-button', Button)
app.use(ElementPlus, {
    size: 'small',
}).use(router);
app.mount('#app');
