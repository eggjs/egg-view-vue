'use strict';
const assert = require('assert');
const request = require('supertest');
const mm = require('egg-mock');
const fs = require('fs');
const path = require('path');

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
      return request(app.callback())
        .get('/')
        .expect('hi, view')
        .expect(200);
    });

    it('should GET /renderString', () => {
      return request(app.callback())
        .get('/renderString')
        .expect('<div server-rendered="true">name:egg-vue-view,desc:egg view plugin for vue</div>')
        .expect(200);
    });

    it('should GET /renderString error', () => {
      return request(app.callback())
        .get('/renderStringError')
        .expect(500);
    });

    it('should GET /render error', () => {
      return request(app.callback())
        .get('/renderError')
        .expect(500);
    });

    it('should GET /render', () => {
      return request(app.callback())
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf('server-rendered="true"') > -1);
          assert(res.text.indexOf('</body></html>') > -1);
          assert(res.text.indexOf('vue server side render!') > -1);
        });
    });

    it('should GET /render cache', function* () {

      const tag = 'server-rendered="true"';
      const title = 'egg-view-vue#unittest';
      const newTitle = 'egg-view-vue#render-cache#unittest';

      yield request(app.callback())
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf(tag) > -1);
          assert(res.text.indexOf(title) > -1);
        });

      const filepath = path.join(app.config.view.root[0], 'test.js');
      const content = fs.readFileSync(filepath, 'utf8');
      fs.writeFileSync(filepath, content.replace(title, newTitle));

      assert(fs.readFileSync(filepath, 'utf8').indexOf(newTitle) > -1);

      yield request(app.callback())
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf(tag) > -1);
          assert(res.text.indexOf(newTitle) === -1);
        });

      fs.writeFileSync(filepath, content);
    });
  });

  describe('vue view no cache', () => {
    let app;
    before(() => {
      mm.env('test');
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    it('should GET /render no cache', function* () {
      const tag = 'server-rendered="true"';
      const title = 'egg-view-vue#unittest';
      const newTitle = 'egg-view-vue#render-cache#unittest';

      yield request(app.callback())
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf(tag) > -1);
          assert(res.text.indexOf(title) > -1);
        });

      const filepath = path.join(app.config.view.root[0], 'test.js');
      const content = fs.readFileSync(filepath, 'utf8');
      fs.writeFileSync(filepath, content.replace(title, newTitle));

      assert(fs.readFileSync(filepath, 'utf8').indexOf(newTitle) > -1);

      yield request(app.callback())
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf(tag) > -1);
          assert(res.text.indexOf(newTitle) > -1);
        });

      fs.writeFileSync(filepath, content);
    });
  });
});
