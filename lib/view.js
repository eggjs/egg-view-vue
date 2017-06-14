'use strict';

class View {
  constructor(ctx) {
    this.app = ctx.app;
  }

  render(name, locals, options = {}) {
    return this.app.vue.renderBundle(name, { state: locals }, options);
  }

  renderString(tpl, locals) {
    return this.app.vue.renderString(tpl, locals);
  }
}

module.exports = View;
