'use strict';

class View {
  constructor(ctx) {
    this.app = ctx.app;
  }

  * render(name, locals, options = {}) {
    // support vue 2.3+ bundle.json server side render
    const bundle = /\.json$/.test(name) ? require(name) : yield this.app.vue.readFile(name);
    return this.app.vue.renderBundle(bundle, { state: locals }, options);
  }

  renderString(tpl, locals) {
    return this.app.vue.renderString(tpl, locals);
  }
}

module.exports = View;
