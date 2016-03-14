'use strict'

/**
 * Module dependencies
 */
const home = require('user-home')
const config = require('./config')
require('shelljs/global')

module.exports = function (version, buildFlavour) {
  try {
    config.set('current', null)
    config.set('buildFlavour', null)
    buildFlavour = buildFlavour || ''
    const dir = `${home}/.nwjs/${buildFlavour}${version}`
    rm('-r', dir)
  } catch (e) {
    console.log(e.stack)
  }
}
