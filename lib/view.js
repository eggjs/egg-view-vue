'use strict';

class View {
  constructor(ctx) {
    this.app = ctx.app;
  }

  * render(name, data, options = {}) {
    const code = yield this.app.vueEngine.readFile(name);
    return this.app.vueEngine.renderCode(code, data, options);
  }

  renderString(tpl, locals) {
    return this.app.vueEngine.renderString(tpl, locals);
  }
}

module.exports = View;
