import { AxiosResponse } from 'axios';

export interface AxiosResponseConfig<T> extends AxiosResponse {
  code?: number;
  msg?: string;
  result?: T;
  config: any;
}

export interface AxiosSourceCancelConfig {
  token: undefined;
  cancel: null;
}
