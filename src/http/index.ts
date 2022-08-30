import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { baseEnv } from './config';
import { AxiosSourceCancelConfig, AxiosResponseConfig } from '@/types';

class HttpClient {
  commonOption; // Axios 请求通用配置
  axios; // Axios 实例
  sourceCancel: AxiosSourceCancelConfig = { token: undefined, cancel: null }; // 取消请求

  constructor(commonOption: any, options: any) {
    this.commonOption = commonOption;
    this.axios = axios.create({
      timeout: 60000,
      cancelToken: this.sourceCancel.token,
      ...options,
    });

    this.axios.interceptors.request.use(this.requestSuccessHandle, this.requestErrorHandle);
    this.axios.interceptors.response.use(this.responseSuccessHandle, this.responseErrorHandle);
  }
  // 请求正常回调
  requestSuccessHandle = (config: AxiosRequestConfig) => ({
    ...config,
    headers: { 'x-requested-with': 'XMLHttpRequest' },
  });
  // 请求失败回调
  requestErrorHandle = (e: AxiosError) => Promise.reject(e);
  // 回包成功回调
  responseSuccessHandle = (response: AxiosResponseConfig<any>) => {
    let msg = '未知错误';
    if (!response || !response.data) {
      msg = '网络错误';
    } else if (response.msg) {
      msg = response.msg;
    }

    console.error(msg);
    return Promise.reject(response.data);
  };
  // 回包失败回调
  responseErrorHandle = (e: AxiosError) => {
    let msg = '未知错误';
    if (axios.isCancel(e)) return Promise.reject(e);
    if (!e?.response || !e.response.data) {
      msg = '网络错误';
    }

    console.error(msg);
    return Promise.reject(e);
  };

  /**
   * @description get post put delete 请求方法
   * @param {*} url string
   * @param {*} option AxiosRequestConfig
   */
  get = (url: string, option: AxiosRequestConfig = {}) => this.axios.get(url, { ...this.commonOption, ...option });

  post = (url: string, data = {}, option: AxiosRequestConfig = {}) =>
    this.axios.post(url, data, { ...this.commonOption, ...option });

  put = (url: string, data = {}, option: AxiosRequestConfig = {}) =>
    this.axios.put(url, data, { ...this.commonOption, ...option });

  delete = (url: string, option: AxiosRequestConfig = {}) =>
    this.axios.delete(url, { ...this.commonOption, ...option });
}

export default new HttpClient(
  {
    baseURL: baseEnv.defaultApi,
    withCredentials: true,
  },
  {},
);
