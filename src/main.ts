import { createApp, App as Application } from 'vue';
import { initCanvas } from '@/utils';
import App from './App.vue';
import singleSpaConfig from './single-spa.config';
import '@/assets/css/common.scss';

/**
 * @description 创建 VUE app 实例
 */
const app: Application = createApp(App);

/**
 * @description 页面水印
 */
initCanvas({ content: 'gokingliu' });

/**
 * @description single-spa 配置
 */
singleSpaConfig(app);

/**
 * @description 挂载 VUE app 到根节点
 */
app.mount('#root');
