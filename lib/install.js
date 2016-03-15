'use strict';

/**
 * Module dependencies
 */
const path = require('path');
const co = require('co');
const os = require('./os');
const pget = require('pget');
const home = require('user-home');
const extract = require('extract-zip');
const pify = require('pify');
const exists = require('path-exists');
const config = require('./config');
require('shelljs/global');

module.exports = co.wrap(function* (version, buildFlavour) {

  buildFlavour = buildFlavour || '';

  try {
    // Create cache dir
    const cacheDir = path.join(home, '.nwjs');
    mkdir('-p', cacheDir);
    // check if has cached nwjs in this version
    if (exists.sync(`${cacheDir}/${buildFlavour}${version}`)) {
      return console.log(`A cached nwjs already located in ${cacheDir}/${buildFlavour}${version}`.red);
    }
    // Download the nwjs
    const fileName = `nwjs` + (buildFlavour ? '-' + buildFlavour : '') + `-v${version}-${os.platform}-${os.arch}`;
    const ext = os.platform === 'linux' ? 'tar.gz' : 'zip';
    const url = `http://dl.nwjs.io/v${version}/${fileName}.${ext}`;
    yield pget(url, {dir: cacheDir, target: `${buildFlavour}${version}.${ext}`, verbose: true, proxy: process.env.HTTP_PROXY});
    // extract both zip and tarball
    const from = `${cacheDir}/${buildFlavour}${version}.${ext}`;
    if (os.platform === 'linux') {
      exec(`tar -xzvf ${from} -C ${cacheDir}`, {silent: true});
    } else {
      yield pify(extract)(from, {dir: cacheDir});
    }
    mv(`${cacheDir}/${fileName}`, `${cacheDir}/${buildFlavour}${version}`);
    // remove zip
    rm(from);
    // update the current using version
    config.set('current', version);
    config.set('buildFlavour', buildFlavour);
  } catch (e) {
    console.log(e.stack);
  }
});
