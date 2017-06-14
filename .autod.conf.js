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
    'eslint',
    'eslint-config-egg'
  ],
  keep: [
  ],
  semver: [
  ]
};
