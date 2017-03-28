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


## Install

```bash
npm i egg-view-vue --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.vue = {
  enable: true,
  package: 'egg-view-vue',
};
```


Set mapping in config

```js
exports.view = {
  // root dir
  root: path.join(app.baseDir, 'public'),
  // memory cache
  cache: 'memory'
};
```

Render in controller

```js
exports.index = function* () {
  yield this.render('home/home.js',{ message: 'vue server side render!' });
};
```


## Feature

### Default View Engine

- view plugin config

```js
exports.view = {
    root: path.join(app.baseDir, 'public'),
}
```

- only support base vue bundle file render and vue object render, not process script, css dependence.

- support `app.viewEngine` object, include `renderCode`, `renderString`, `readFile` methods, easy to custom view engine


### Solution View Engine

- when the view configuration includes the solution configuration, the solution will be used

- you need to use `egg-vue-webpack-dev` plugin to build the project.

- how to use, please see the demo project `egg-vue-webpack-example`

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

## Configuration

see [config/config.default.js](config/config.default.js) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
