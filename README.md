# SingleSpa 主应用

- 项目名称: single-spa-root-template
- 说明: 此项目为微前端主应用，使用了 single-spa 微前端框架。项目构建支持 vue-cli 和 vite 工具，本地开发可使用 vite 提升开发体验，打包静态资源仅使用 vue-cli 保障项目兼容性。

## 技术栈

- 微前端: **single-spa**
- 构建工具: **vue-cli5** **vite3**
- 前端框架: **vue3**
- 编程语言: **typescript** **tsx** **javascript**
- CSS 预编译: **sass**
- 网络请求: **axios**
- 代码规范: **eslint** **prettier**
- GIT 规范: **husky**
- modules 管理: **pnpm** **npm**

## 本地运行

- Vite 单独启动

```shell
npm run vite:standalone
```

- Vue CLI 单独启动

```shell
npm run webpack:standalone
```

## 打包项目

```shell
npm run build
```

## 代码格式化

```shell
npm run lint
```
