'use strict';
const data = {
  list: [{
    title: 'vue',
    hits: 200,
    url: 'https://cn.vuejs.org',
  }, {
    title: 'webpack configuration',
    hits: 550,
    url: 'https://webpack.js.org/configuration/',
  }, {
    title: 'egg',
    hits: 278,
    url: 'https://eggjs.org/',
  }, {
    title: 'axios',
    hits: 998,
    url: 'https://www.awesomes.cn/repo/mzabriskie/axios',
  }, {
    title: 'Centralized State Management for Vue.js',
    hits: 232,
    url: 'https://github.com/vuejs/vuex',
  }, {
    title: 'webpack server build',
    hits: 988,
    url: 'http://jlongster.com/Backend-Apps-with-Webpack--Part-I',
  }, {
    title: 'vue component loader for Webpack',
    hits: 322,
    url: 'https://github.com/vuejs/vue-loader',
  }, {
    title: 'vue-router--The official router for Vue.js',
    hits: 566,
    url: 'https://github.com/vuejs/vue-router',
  }, {
    title: 'vue life cycle',
    hits: 434,
    url: 'http://www.jianshu.com/p/e9f884b6ba6c',
  }, {
    title: 'babel',
    hits: 432,
    url: 'https://github.com/lcxfs1991/blog/issues/9',
  }, {
    title: 'HTTP2',
    hits: 565,
    url: 'https://segmentfault.com/a/1190000007219256?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly',
  }, {
    title: 'HTTP,HTTP2.0,SPDY,HTTPS',
    hits: 787,
    url: 'http://www.alloyteam.com/2016/07/httphttp2-0spdyhttps-reading-this-is-enough/',
  }, {
    title: 'git - help',
    hits: 121,
    url: 'http://rogerdudler.github.io/git-guide/index.zh.html',
  }, {
    title: 'Migrating from v1 to v2',
    hits: 555,
    url: 'https://webpack.js.org/guides/migrating/',
  }],
};

let id = 1;

data.list = data.list.concat(data.list);

data.list.forEach(item => {
  item.id = id++;
});


const total = data.list.length;
exports.getPage = (pageIndex = 1, pageSize = 10) => {
  const start = (pageIndex - 1) * pageSize;
  const end = start + Number(pageSize);
  return { list: data.list.slice(start, end), total };
};

exports.getDetail = id => {
  return data.list.filter(item => {
    return item.id === id;
  }).slice(0, 1);
};
