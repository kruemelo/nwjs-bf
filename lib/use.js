'use strict'

/**
 * Module dependencies
 */
const path = require('path')
const home = require('user-home')
const exists = require('path-exists')
const config = require('./config')

module.exports = function (version, buildFlavour) {
	buildFlavour = buildFlavour || ''
  config.set('current', version)
  config.set('buildFlavour', buildFlavour)
  const cached = path.join(home, '.nwjs', buildFlavour + version)
  if (!exists.sync(cached)) {
    return console.log(`Run ${`nw install ${version} ${buildFlavour}`.red} first`)
  }
  console.log(`You're using v${version} ${buildFlavour} now!`.green)
}
