'use strict';
const Model = require('../mocks/article/list');

exports.renderString = function* (ctx) {
  ctx.body = yield ctx.renderString('<div>name:{{name}},desc:{{desc}}</div>', {
    name: 'egg-vue-view',
    desc: 'egg view plugin for vue',
  });
};

exports.renderStringError = function* (ctx) {
  try {
    ctx.body = yield ctx.renderString('<div>name:{{user.name}},desc:{{user.desc}}</div>', {
      name: 'egg-vue-view',
      desc: 'egg view plugin for vue',
    });
  } catch (e) {
    ctx.status = 500;
    ctx.body = e.toString();
  }
};

exports.render = function* (ctx) {
  yield ctx.render('test.js', { message: 'egg-view-vue#vue server side render!' });
};

exports.renderJSONBundle = function* (ctx) {
  const url = ctx.url.replace(/\/app/, '') || '/';
  yield ctx.render('vue-ssr-server-bundle.json', { url }, {
    renderOptions: {
      template: '<!DOCTYPE html><html lang="en"><body><!--vue-ssr-outlet--></body></html>',
      clientManifest: require('../public/vue-ssr-client-manifest.json'),
    },
  });
};

exports.list = function* (ctx) {
  const pageIndex = ctx.query.pageIndex;
  const pageSize = ctx.query.pageSize;
  ctx.body = Model.getPage(pageIndex, pageSize);
};

exports.detail = function* (ctx) {
  const id = ctx.query.id;
  ctx.body = Model.getDetail(id);
};

exports.renderError = function* (ctx) {
  try {
    yield ctx.render('error.js', {
      data: {
        name: 'vue render',
        description: 'egg view plugin for swig',
      },
    });
  } catch (e) {
    ctx.status = 500;
    ctx.body = e.toString();
  }
};
