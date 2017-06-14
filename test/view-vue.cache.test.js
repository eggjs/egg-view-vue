'use strict';
const assert = require('assert');
const mm = require('egg-mock');
const fs = require('fs');
const path = require('path');

describe('test/view-vue.cache.test.js', () => {
  const tag = 'data-server-rendered="true"';
  const title = 'egg-view-vue#unittest';
  const newTitle = 'egg-view-vue#render-cache#unittest';
  const filepath = path.join(__dirname, 'fixtures/apps/view-vue-test/app/view/test.js');
  const content = fs.readFileSync(filepath, 'utf8');
  const saveContent = () => {
    fs.writeFileSync(filepath, content);
  };
  describe('default view engine', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(() => {
      saveContent();
      mm.restore();
    });

    it('should GET /render cache', function* () {
      yield app.httpRequest()
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.includes(tag));
          assert(res.text.includes(title));
        });

      fs.writeFileSync(filepath, content.replace(title, newTitle));

      assert(fs.readFileSync(filepath, 'utf8').includes(newTitle));

      yield app.httpRequest()
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.includes(tag));
          assert(!res.text.includes(newTitle));
        });
    });
  });

  describe('vue view no cache', () => {
    let app;
    before(() => {
      mm.env('local');
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(() => {
      saveContent();
      mm.restore();
    });

    it('should GET /render no cache', function* () {
      yield app.httpRequest()
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.includes(tag));
          assert(res.text.includes(title));
        });

      fs.writeFileSync(filepath, content.replace(title, newTitle));

      assert(fs.readFileSync(filepath, 'utf8').indexOf(newTitle) > -1);

      yield app.httpRequest()
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.includes(tag));
          assert(res.text.includes(newTitle));
        });
    });
  });

  describe('view lru object cache', () => {
    let app;
    before(() => {
      mm.env('test');
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(() => {
      saveContent();
      mm.restore();
    });

    it('should GET /render lru object cache', function* () {

      yield app.httpRequest()
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.includes(tag));
          assert(res.text.includes(title));
        });

      fs.writeFileSync(filepath, content.replace(title, newTitle));

      assert(fs.readFileSync(filepath, 'utf8').includes(newTitle));

      yield app.httpRequest()
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.includes(tag));
          assert(!res.text.includes(newTitle));
        });
    });
  });

  describe('view custom cache', () => {
    let app;
    before(() => {
      mm.env('prod');
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(() => {
      saveContent();
      mm.restore();
    });

    it('should GET /render custom object cache', function* () {

      yield app.httpRequest()
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.includes(tag));
          assert(res.text.includes(title));
        });

      fs.writeFileSync(filepath, content.replace(title, newTitle));

      assert(fs.readFileSync(filepath, 'utf8').includes(newTitle));

      yield app.httpRequest()
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.includes(tag));
          assert(!res.text.includes(newTitle));
        });
    });
  });
});
