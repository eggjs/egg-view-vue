'use strict';
const renderStringVM = require('../view/renderString');
const path = require('path');

exports.renderString = function* () {
  this.body = yield this.renderString(renderStringVM);
};
exports.render = function* () {
  yield this.render('test/test.js', { message: 'vue server side render!' });
};

exports.error = function* () {
  // 服务端render报错,采用客户端模板渲染, error.js js 内容不正确(在test.js开头加了a.b,这样服务器render时会报错)
  yield this.render('error/error.js', { message: 'vue server side render!' });
};

exports.renderView = function* () {
  yield this.renderView('test/test.js', { message: 'vue server side render!' });
};

exports.viewEngineReadFile = function* () {
  this.body = yield this.app.viewEngine.readFile(path.join(this.app.baseDir, 'public/build.json'));
};

exports.viewEngineRenderString = function* () {
  this.body = yield this.app.viewEngine.renderString(renderStringVM);
};

exports.viewEngineRenderCode = function* () {
  const filePath = path.join(this.app.baseDir, 'public/test/test.js');
  const code = yield this.app.viewEngine.readFile(filePath);
  this.body = yield this.app.viewEngine.renderCode(code, { message: 'vue server side render!' });
};
