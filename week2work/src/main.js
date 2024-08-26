import Vue from 'vue';
import axios from 'axios';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import ElementUI from 'element-ui'; // ElementUI组件库
import 'element-ui/packages/theme-chalk/lib/index.css'; // ElementUI组件库样式
import '@/mock';

const request = axios.create({
  baseURL: 'http://localhost',
  timeout: 1000 * 60,
  withCredentials: true,
});

// respone 拦截器
request.interceptors.response.use(
  response => {
    const { data = {} } = response;
    const { success } = data;
    if (success) {
      return data;
    } else {
      return { success };
    }
  },
  error => {
    return { success: false };
  });

Vue.prototype.$request = request;

// 注册饿了么UI
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





