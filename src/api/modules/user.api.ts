import { AxiosResponseConfig, RequestUserAuth, ResponseUserAuth } from '@/types';
import { baseEnv } from '@/http/config';
import http from '@/http';

const User = {
  /**
   * @description 用户权限 (默认 api 域名请求)
   */
  queryUserAuth(): Promise<AxiosResponseConfig<ResponseUserAuth>> {
    return http.get('/userAuth');
  },

  /**
   * @description demo (其他 api 域名请求)
   */
  queryOtherApi(data: RequestUserAuth): Promise<AxiosResponseConfig<ResponseUserAuth>> {
    return http.post('/api2', data, { baseURL: baseEnv.otherApi, withCredentials: false });
  },
};

export default User;
