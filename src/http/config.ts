/**
 * 域名对应环境
 */
const hostNameEnvMap = {
  'gokingliu.xyz': 'production',
  'gokingliu.test.xyz': 'test',
  'gokingliu.dev.xyz': 'development',
};

/**
 * 根据打包类型和域名，判断当前环境
 */
const env: string | undefined =
  process.env.NODE_ENV === 'production' ? hostNameEnvMap[window.location.host] || 'development' : process.env.NODE_ENV;

/**
 * http 请求环境配置
 */
const envMap = {
  // 生产环境
  production: {
    defaultApi: 'https://gokingliu.xyz',
    otherApi: 'https://',
  },
  // 测试环境
  test: {
    defaultApi: 'https://gokingliu.test.xyz',
    otherApi: 'https://',
  },
  // 开发环境
  development: {
    defaultApi: 'https://gokingliu.dev.xyz',
    otherApi: 'https://',
  },
};

export const baseEnv = env ? envMap[env] : envMap.development;
