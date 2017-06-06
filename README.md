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

egg view plugin for [vue].

## Install

```bash
$ npm i egg-view-vue --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.vue = {
  enable: true,
  package: 'egg-view-vue',
};
```

Render in controller, support js bundle render and json bundle render (vue 2.3+)

### js bundle render

```js
// {app_root}/app/controller/test.js
exports.home = function* (ctx) {
  yield ctx.render('vue-ssr-server-bundle.js', { name: 'vue js bundle render' });
};
```

### json bundle render (vue 2.3+), need to config renderOptions

```js
// {app_root}/config/config.default.js
exports.vue = {
   renderOptions: {
     template: '<!DOCTYPE html><html lang="en"><body><!--vue-ssr-outlet--></body></html>',
     clientManifest: require('vue-ssr-client-manifest.json')
   }
};
```

```js
// {app_root}/app/controller/test.js
exports.home = function* (ctx) {
  yield ctx.render('vue-ssr-server-bundle.json', { name: 'vue json render' });
};
```

## Configuration

see [config/config.default.js](config/config.default.js) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg-view-vue/issues).

## License

[MIT](LICENSE)