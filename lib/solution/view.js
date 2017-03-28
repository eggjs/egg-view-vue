/**
 * Created by caoli on 17/3/16.
 */
'use strict';
const helper = require('./helper');

class VueView {
  constructor(ctx) {
    this.app = ctx.app;
    this.config = this.app.config.view;
    this.helper = helper(this.app);
  }

  * render(name, data, options = {}) {
    const code = yield this.app.viewEngine.readFile(name);
    const html = yield this.app.viewEngine.renderCode(code, data, options).catch(err => {
			// 服务器渲染失败,采用客户端渲染
      this.app.logger.error('[%s] server render bundle error, try client render, the server render error', name, err);
      return this.app.solution.layoutTemplate || '';
    });
    return Promise.resolve(this.helper.injectResource(name, html, data, options));
  }

  * renderString(vm) {
    return this.app.viewEngine.renderString(vm);
  }
}

module.exports = VueView;
