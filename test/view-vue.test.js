'use strict';
const assert = require('assert');
const mm = require('egg-mock');

describe('test/view-vue.test.js', () => {

  describe('default view engine', () => {
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
      return app.httpRequest()
        .get('/')
        .expect('hi, view')
        .expect(200);
    });

    it('should GET /renderString', () => {
      return app.httpRequest()
        .get('/renderString')
        .expect('<div data-server-rendered="true">name:egg-vue-view,desc:egg view plugin for vue</div>')
        .expect(200);
    });

    it('should GET /renderString error', () => {
      return app.httpRequest()
        .get('/renderStringError')
        .expect(500);
    });

    it('should GET /render error', () => {
      return app.httpRequest()
        .get('/renderError')
        .expect(500);
    });

    it('should GET /render', () => {
      return app.httpRequest()
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.includes('data-server-rendered="true"'));
          assert(res.text.includes('</body></html>'));
          assert(res.text.includes('egg-view-vue#vue server side render!'));
        });
    });

    it('should GET /renderJSON', () => {
      return app.httpRequest()
        .get('/app')
        .expect(200)
        .expect(res => {
          assert(res.text.includes('data-server-rendered="true"'));
          assert(res.text.includes('</body></html>'));
          assert(res.text.includes('.page-container'));
          assert(res.text.includes('window.__INITIAL_STATE__'));
          assert(res.text.includes('/public/static/js/vendor.js"'));
          assert(res.text.includes('/public/static/js/app/app.js"'));
        });
    });
  });
});
