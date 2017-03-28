/**
 * Created by caoli on 17/3/16.
 */
'use strict';

module.exports = app => {
  if (app.config.view.solution) {
    app.view.use('vue', require('./lib/solution/view'));
  } else {
    app.view.use('vue', require('./lib/view'));
  }
};
