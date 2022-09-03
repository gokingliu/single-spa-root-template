import { reactive, ref, App as Application } from 'vue';
import { addErrorHandler, getAppStatus, registerApplication, start, LOAD_ERROR } from 'single-spa';
import api from '@/api';
import { ResponseUserAuth, SingleSpaAppProps, SingleSpaRootPath } from '@/types';

export default function singleSpaConfig(app: Application) {
  /**
   * @description 全局服务变量
   */
  const appLoading = ref(false);
  app.provide('$appLoading', appLoading);

  /**
   * @description 获取路径信息
   */
  const getAppPathInfo = (): string => {
    const paths = location.pathname.split('/').filter((x) => x);
    switch (paths.length) {
      case 1:
        return paths[0];
      default:
        return 'single-spa-app-vue3-vite-template';
    }
  };

  /**
   * @description 定义子应用变量
   */
  const appPath1 = 'single-spa-app-vue3-vite-template';
  const appProps: SingleSpaAppProps = reactive({ userAuth: null });
  const appPathInfo: SingleSpaRootPath = { rootPath: getAppPathInfo() };

  /**
   * @description 获取子应用用户权限
   */
  const getAppUserAuth = async (): Promise<ResponseUserAuth | null | undefined> => {
    try {
      const { result } = await api.queryUserAuth();
      return result;
    } catch (e) {
      console.info('[SingleSpa] start error %c%s', 'color: red;', e);
      // TODO 应返回 null，这里因为是假接口，所以返回了一个 demo 数据
      // return null;
      return { addAuth: true, searchAuth: false };
    }
  };

  /**
   * @description 注册 SingleSpa 子应用
   */
  try {
    registerApplication({
      name: process.env.VUE_APP_NAME1,
      app: () => window.System.import(process.env.VUE_APP_ENTRY1),
      activeWhen: appPath1,
      customProps: { parcelProps: appProps },
    });
    // 请注意，如果使用 SystemJS 加载应用，则需要添加以下代码，为了使 SystemJS 加载出错时重新尝试网络请求
    addErrorHandler((err) => {
      if (getAppStatus(err.appOrParcelName) === LOAD_ERROR) {
        window.System?.delete(window.System.resolve(err.appOrParcelName));
      }
    });
  } catch (e) {
    registerApplication({
      name: import.meta.env.VITE_APP_NAME1,
      app: () => import(/* @vite-ignore */ import.meta.env.VITE_APP_ENTRY1),
      activeWhen: appPath1,
      customProps: { parcelProps: appProps },
    });
  }

  /**
   * @description 监听子项目挂载事件，停止 Loading 状态
   */
  window.addEventListener('single-spa:first-mount', () => {
    appLoading.value = false;
  });

  /**
   * @description 启动 SingleSpa 前，请求特定子应用的权限信息
   */
  (async function () {
    try {
      appLoading.value = true;
      // 对于特定子应用，执行网络请求 (其他不需要网络请求的子应用，不需要特殊处理)
      if (appPath1 === appPathInfo.rootPath) {
        appProps.userAuth = await getAppUserAuth();
      }
      // 启动子应用
      start({ urlRerouteOnly: true });
      // 子应用挂载后，移除监听事件
      window.removeEventListener('single-spa:first-mount', () => {
        appLoading.value = false;
      });
    } catch (e) {
      appLoading.value = false;
      console.info('[SingleSpa] start error %c%s', 'color: red;', e);
    }
  })();
}
