'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/view-vue.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/view-vue-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should GET /', () => {
    return request(app.callback())
      .get('/')
      .expect('hi, view-vue')
      .expect(200);
  });
});
