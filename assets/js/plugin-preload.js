const { remote, screen } = require('electron')
const ROOT = remote.getGlobal('ROOT')
const MODULE_PATH = remote.getGlobal('MODULE_PATH')
const config = remote.require('./lib/config')

require('module').globalPaths.push(MODULE_PATH)
require('babel-register')(require(`${ROOT}/babel.config`))
require('coffee-react/register')

const onZoomChange = (value) => {
  document.body.style.zoom = value
}

const handleZoom = (path, value) => {
  if (path === 'poi.zoomLevel') {
    onZoomChange(value)
  }
}

config.addListener('config.set', handleZoom)

window.addEventListener('unload', (e) => {
  config.removeListener('config.set', handleZoom)
})

document.addEventListener('DOMContentLoaded', () => onZoomChange(config.get('poi.zoomLevel', screen.getPrimaryDisplay().scaleFactor)))
