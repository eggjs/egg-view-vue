'use strict';
const assert = require('assert');
const request = require('supertest');
const mm = require('egg-mock');
const path = require('path');
const fs = require('fs');

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
        .expect('<ul server-rendered="true"><li>sky</li><li>carl</li></ul>')
        .expect(200);
    });

    it('should GET /render', () => {
      return request(app.callback())
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf('server-rendered="true"') > -1);
          assert(res.text.indexOf('</body></html>') > -1);
          assert(res.text.indexOf('vue server side render!') > -1);
          assert(res.text.indexOf('/public/static/css/test/test.de1a523.css') === -1);
          assert(res.text.indexOf('/public/static/js/vendor.cfa4086.js"') === -1);
          assert(res.text.indexOf('/public/static/js/test/test.f551f51.js"') === -1);
        });
    });
  });

  describe('solution view engine', () => {
    let app;
    before(() => {
      mm.env('test');
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mm.restore);

    it('should solution test', () => {
      assert.equal(app.solution != null, true);
    });

    it('should GET /renderString', () => {
      return request(app.callback())
        .get('/renderString')
        .expect('<ul server-rendered="true"><li>sky</li><li>carl</li></ul>')
        .expect(200);
    });

    it('should GET /render, test js, css inject', () => {
      return request(app.callback())
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf('server-rendered="true"') > -1);
          assert(res.text.indexOf('</body></html>') > -1);
          assert(res.text.indexOf('window.__INITIAL_STATE__= {\"data\":{\"message\":\"vue server side render!\"}};') > -1);
          assert(res.text.indexOf('<link rel=\"stylesheet\" href=\"/public/static/css/test/test.de1a523.css\">') > -1);
          assert(res.text.indexOf('<script type=\"text/javascript\" src=\"/public/static/js/test/test.f551f51.js\">') > -1);
          assert(res.text.indexOf('<script type=\"text/javascript\" src=\"/public/static/js/vendor.cfa4086.js\">') > -1);
        });
    });

    it('should GET /server render error, try client render', () => {
      return request(app.callback())
        .get('/error')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf('server-rendered="true"') === -1);
          assert(res.text.indexOf('</body>') > -1);
          assert(res.text.indexOf('</html>') > -1);
          assert(res.text.indexOf('<title>vue server render error, client template</title>') > -1);
          assert(res.text.indexOf('window.__INITIAL_STATE__= {\"data\":{\"message\":\"vue server side render!\"}};') > -1);
          assert(res.text.indexOf('<link rel=\"stylesheet\" href=\"/public/static/css/error/error.de1a523.css\">') > -1);
          assert(res.text.indexOf('<script type=\"text/javascript\" src=\"/public/static/js/error/error.f551f51.js\">') > -1);
          assert(res.text.indexOf('<script type=\"text/javascript\" src=\"/public/static/js/vendor.cfa4086.js\">') > -1);
        });
    });
  });

  describe('solution view engine cache', () => {
    let app;
    before(() => {
      mm.env('test');
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mm.restore);

    it('should GET /render cache', () => {
      const cacheOptions = app.solution.cache.options;
      delete cacheOptions.cache;
      app.solution.cache.options = cacheOptions;
      return request(app.callback())
        .get('/render')
        .expect(200);
    });

    it('should GET /render cache', () => {
      const filePath = path.join(app.baseDir, 'public/test/test.js');
      app.solution.cache.isCache = true;
      app.solution.cache.memory = true;
      app.solution.cache.set(filePath, fs.readFileSync(filePath, 'utf8'));
      return request(app.callback())
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf('server-rendered="true"') > -1);
        });
    });

    it('should GET /render cache content empty', () => {
      const filePath = path.join(app.baseDir, 'public/test/test.js');
      app.solution.cache.isCache = true;
      app.solution.cache.memory = true;
      app.solution.cache.set(filePath, '');
      return request(app.callback())
        .get('/render')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf('server-rendered="true"') > -1);
        });
    });
  });

  describe('app view engine', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mm.restore);

    it('should GET /renderFile', () => {
      return request(app.callback())
        .get('/viewEngine/readFile')
        .expect(200)
        .expect(res => {
          const config = JSON.parse(res.text);
          assert.strictEqual(config.publicPath, '/public/');
        });
    });

    it('should GET /viewEngine/renderString', () => {
      return request(app.callback())
        .get('/viewEngine/renderString')
        .expect('<ul server-rendered="true"><li>sky</li><li>carl</li></ul>')
        .expect(200);
    });

    it('should GET /viewEngine/renderCode', () => {
      return request(app.callback())
        .get('/viewEngine/renderCode')
        .expect(200)
        .expect(res => {
          assert(res.text.indexOf('server-rendered="true"') > -1);
          assert(res.text.indexOf('vue server side render!') > -1);
        });
    });
  });

  describe('should cache test', () => {
    let app;
    before(() => {
      mm.env('test');
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mm.restore);

    const key = 'key_cache_one';
    const value1 = 'cache test';
    const value2 = 'cache test two';

    it('should no cache test ', () => {
      app.config.view.cache = false;
      const Cache = require('../lib/solution/cache')(app);
      const cache = new Cache();
      cache.set(key, value1);
      assert.strictEqual(cache.get(key), undefined);
      cache.clear();
      assert.strictEqual(cache.get(key), undefined);
    });

    it('should has cache test ', () => {

      app.config.view.cache = 'memory';
      const Cache = require('../lib/solution/cache')(app);
      const cache = new Cache();

      cache.set(key, value1);
      assert.strictEqual(cache.get(key), value1);

      cache.set(key, value2);
      assert.strictEqual(cache.get(key), value2);

      cache.clear();
      assert.strictEqual(cache.get(key), undefined);
    });

    it('should custom cache test ', () => {
      const map = {};
      const CustomCache = {
        set(key, value) {
          map[ key ] = value;
        },
        get(key) {
          return map[ key ];
        },
      };

      app.config.view.cache = CustomCache;
      const Cache = require('../lib/solution/cache')(app);
      const cache = new Cache();
      cache.set(key, value1);
      assert.strictEqual(cache.get(key), value1);
    });

    it('should custom cache test error ', () => {
      const map = {};
      const CustomCache = {
        set(key, value) {
          map[ key ] = value;
        },
      };
      app.config.view.cache = CustomCache;
      try {
        const Cache = require('../lib/solution/cache')(app);
        new Cache();
      } catch (e) {
        assert.equal(e.message.indexOf('Invalid cache option') > -1, true);
      }
    });
  });

  describe('should app test', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mm.restore);

    it('should solution test', () => {
      assert.equal(app.solution, null);
    });
  });


  describe('should app solution test', () => {
    let app;
    before(() => {
      mm.env('test');
      app = mm.app({
        baseDir: 'apps/view-vue-test',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mm.restore);

    it('should solution manifest test', () => {
      const resource = app.solution.manifest[ 'test/test.js' ];
      assert(resource.script.length === 2);
      assert(resource.css.length === 2);
    });
  });

});
