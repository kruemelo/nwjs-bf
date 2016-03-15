'use strict';

/**
 * Module dependencies
 */
const exists = require('path-exists');
const spawn = require('child-process-promise').spawn;
const config = require('./config');
const getPath = require('./get-path');

module.exports = function () {
  try {
    const args = Array.prototype.slice.call(arguments, 0, -1);
    const version = config.get('current');
    const buildFlavour = config.get('buildFlavour') || '';

    const nw = getPath();

    if (!exists.sync(nw)) {
      return console.log(`Cached nwjs excutable ${buildFlavour} v${version} not found, run ${`nw install ${version} ${buildFlavour}`.cyan} first`);
    }
    console.log(`Using nw.js ${buildFlavour} v${version}`);

    spawn(nw, args)
      .progress(childProcess => {
        childProcess.stdout.on('data', function (data) {
          process.stdout.write(data.toString());
        })
        childProcess.stderr.on('data', function (data) {
          process.stderr.write(data.toString());
        })
      })
      .then(function () {
        console.log('===================='.green);
        console.log('bye!'.green);
      });
  } catch (e) {
    console.log(e.stack);
  }
};
