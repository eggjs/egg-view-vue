'use strict';

module.exports = {
  write: true,
  plugin: 'autod-egg',
  prefix: '^',
  exclude: [
    './test/fixtures',
    './docs',
    './coverage',
  ],
  devdep: [
    'autod',
    'autod-egg',
    'egg-bin',
    'egg-mock',
    'mocha',
    'eslint',
    'eslint-config-egg'
  ],
  keep: [
  ],
  semver: [
  ]
};
