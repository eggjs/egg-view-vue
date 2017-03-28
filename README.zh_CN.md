# egg-view-vue

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-view-vue.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-view-vue
[travis-image]: https://img.shields.io/travis/eggjs/egg-view-vue.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-view-vue
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-view-vue.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-view-vue?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-view-vue.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-view-vue
[snyk-image]: https://snyk.io/test/npm/egg-view-vue/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-view-vue
[download-image]: https://img.shields.io/npm/dm/egg-view-vue.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-view-vue

[vue](https://github.com/vuejs/vue) view plugin for egg.


## 安装插件

```bash
npm i egg-view-vue --save
```

## 使用场景

#### 开启插件

```js
// {app_root}/config/plugin.js
exports.vue = {
  enable: true,
  package: 'egg-view-vue',
};
```


#### 配置

```js
// {app_root}/config/config.default.js
exports.view = {
  // root dir
  root: path.join(app.baseDir, 'public'),
  // memory cache
  cache: 'memory'
};
```

#### 使用

```js
exports.index = function* () {
  yield this.render('home/home.js',{ message: 'vue server side render!' });
};
```


## 特性

### 默认视图引擎


- 配置如下, 不包含solution节点

```js
exports.view = {
    root: path.join(app.baseDir, 'public'),
}
```

- 当view配置不包含solution节点配置时, 仅提供jsbundle渲染成html 的 `render` , `renderString`方法, 不处理script, css等依赖问题.

- 暴露 `app.viewEngine` 对象, 包括 `renderCode`, `renderString`, `readFile` 方法,  可以根据构建方式的不同进行扩展.

比如render完成html后, 根据文件依赖的css, script, 把css, script 注入到 html中, 这样才是一个完整的页面.




### 解决方案视图引擎

- 配置如下, 包含solution节点

```js
exports.view = {
  root: path.join(app.baseDir, 'public'),
  solution: {
    // where server render error, will use client render
  	layout: path.join(app.baseDir, 'app/web/view/layout/layout.html')
  }
};
```

```html
//layout.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title> where server render error, will use client render</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  </head>
  <body>
  <div id="app"></div>
  </body>
</html>
```

- 当view配置包括如上 solution 配置信息时, 将使用解决方案Engine, 解决jsbundle渲染成html, script, css 依赖等问题.

- 支持文件读取缓存和jsbundle缓存.

- 支持服务器渲染失败时, 客户端再次渲染.

- 需要安装 `egg-vue-webpack-dev` vue前端工程化解决方案构建插件或者根据solution规范自己搭建解决方案. 建议使用`egg-vue-webpack-dev`默认支持的构建解决方案, 如有需要,可以提供建议.

- 具体使用请查看 `egg-vue-webpack-example` 工程化解决方案示例.



## 详细配置

see [config/config.default.js](config/config.default.js) for more detail.

## 提问问题或建议

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。


## License

[MIT](LICENSE)
