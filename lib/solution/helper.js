/**
 * Created by caoli on 16/12/20.
 */
'use strict';
const fs = require('fs');
const utils = require('../utils');
const serialize = require('serialize-javascript');

module.exports = app => {

  const helper = {};

  helper.injectResource = (name, content, data) => {
    const headRegExp = /(<\/head>)/i;
    const bodyRegExp = /(<\/body>)/i;
    const solutionConfig = app.solution;
    const manifest = solutionConfig.manifest;
    /* istanbul ignore next */
    if (manifest) {
      const fileKey = utils.getFileName(app.config.view.root, name);
      const fileManifest = manifest[ fileKey ];
      if (fileManifest) {
        const publicPath = solutionConfig.publicPath.replace(/\/$/, '');
        const cssInject = fileManifest.css.map(item => {
          return `<link rel="stylesheet" href="${publicPath + item}">`;
        });
        const scriptInject = fileManifest.script.map(item => {
          return `<script type="text/javascript" src="${publicPath + item}"></script>`;
        });
        scriptInject.unshift(`<script> window.__INITIAL_STATE__= ${serialize({ data }, { isJSON: true })};</script>`);
        content = content.replace(headRegExp, match => {
          return cssInject.join('') + match;
        });
        content = content.replace(bodyRegExp, match => {
          return scriptInject.join('') + match;
        });
      }
    }
    return content;
  };

  /* istanbul ignore next */
  helper.readFile = filePath => {
    try {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
      }
      app.logger.error(`${filePath} is not exist`);
    } catch (e) {
      app.logger.error(`read file ${filePath} error`, e);
    }
    return '';
  };

  /* istanbul ignore next */
  helper.require = filePath => {
    try {
      if (fs.existsSync(filePath)) {
        return require(filePath);
      }
      app.logger.error(`${filePath} is not exist`);
    } catch (e) {
      app.logger.error(`require ${filePath} error`, e);
    }
    return null;
  };

  helper.getManifest = buildConfig => {
    const manifest = helper.require(utils.getFilePath(app.config.view.root, 'manifest.json'));
    const formatManifest = {};
    /* istanbul ignore next */
    if (manifest) {
      const commonsChunk = buildConfig.commonsChunk || [];
      const commonScriptPaths = [];
      const commonCSSPaths = [];
      commonsChunk.forEach(item => {
        const jsKey = '/' + item + '.js';
        const cssKey = '/' + item + '.css';
        manifest[ jsKey ] && commonScriptPaths.push(manifest[ jsKey ]);
        manifest[ cssKey ] && commonCSSPaths.push(manifest[ cssKey ]);
      });

      Object.keys(manifest).forEach(item => {
        if (/\.js$/.test(item)) {
          const key = item.replace(/^\//, '');
          formatManifest[ key ] = {
            script: commonScriptPaths.concat(manifest[ item ]),
            css: commonCSSPaths.concat(manifest[ item.replace(/\.js$/, '.css') ] || []),
          };
        }
      });
    }
    return formatManifest;
  };


  helper.getBuildConfig = () => {
    return helper.require(utils.getFilePath(app.config.view.root, 'build.json'));
  };

  return helper;
};
