/**
 * Created by caoli on 16/12/20.
 */
'use strict';
const path = require('path');
const fs = require('fs');

const utils = {};

utils.formatData = data => {
  data.ctx = data.request = data.helper = undefined;
  return data;
};

/* istanbul ignore next */
utils.getFilePath = (dirs, fileName) => {
  if (Array.isArray(dirs)) {
    const dir = dirs.filter(dir => fs.existsSync(path.join(dir, fileName)));
    if (dir.length === 0) {
      throw new Error(`file ${fileName} is not exist in dirs ${dirs}`);
    }
    return path.join(dir[0], fileName);
  }
  return path.join(dirs, fileName);
};

utils.getFileName = (dirs, filePath) => {
  return filePath.replace(dirs[0], '').replace(/^\//, '');
};

module.exports = utils;
