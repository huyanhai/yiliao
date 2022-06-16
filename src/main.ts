import { createApp } from 'vue';

import TDesign from 'tdesign-vue-next';
import Antd from 'ant-design-vue';

import 'tdesign-vue-next/es/style/index.css';

import { store } from './store';
import router from './router';
import '@/style/index.less';
import './permission';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

app.use(TDesign);
app.use(Antd);
app.use(store);
app.use(router);

app.mount('#app');
