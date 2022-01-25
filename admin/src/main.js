import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn';



import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(
    function (config) {
        config.headers.authorization = localStorage.authorization_token;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);







createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus, {
        zIndex: 9999999,
        locale: zhCn
    })
    .mount('#app')