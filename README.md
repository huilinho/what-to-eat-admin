# what-to-eat-admin

基于vue-admin-template框架https://github.com/PanJiaChen/vue-admin-template

## 开发

```bash
# enter the project directory
cd what-to-eat-admin

# install dependency
npm install

# dev默认启动mock服务
npm run dev
```

This will automatically open http://localhost:9528

## 打包

```bash
# build for production environment
npm run build:prod
```

## 配置相关

请求接口的base路径在.env.xxx的VUE_APP_BASE_API配置

```
// 如果本地接口根路径为http://127.0.0.1:8527/admapi

//修改.env.developerment

VUE_APP_BASE_API = '/admapi'

// 线上环境修改.env.production
VUE_APP_BASE_API = '线上路径'
```

