'use strict';

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
  yield ctx.render('test.js', { message: 'vue server side render!' });
};

exports.renderError = function* (ctx) {
  try {
    yield ctx.render('error.js', {
      data: {
        name: 'swig render',
        description: 'egg view plugin for swig',
      },
    });
  } catch (e) {
    ctx.status = 500;
    ctx.body = e.toString();
  }
};
