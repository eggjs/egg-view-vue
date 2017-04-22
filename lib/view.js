'use strict';

class View {
  constructor(ctx) {
    this.app = ctx.app;
  }

  * render(name, data, options = {}) {
    const code = yield this.app.vue.readFile(name);
    return this.app.vue.renderCode(code, data, options);
  }

  renderString(tpl, locals) {
    return this.app.vue.renderString(tpl, locals);
  }
}

module.exports = View;
