import init from 'startupjs/init'
import startupjsServer from 'startupjs/server'
import { initApp } from 'startupjs/app/server'
import { getUiHead, initUi } from '@startupjs/ui/server'
import orm from '../model'
import api from './api'
import getMainRoutes from '../main/routes'
import getAdminRoutes from '../admin/routes'
import { initAuth } from '@startupjs/auth/server'
import { getAuthRoutes } from '@startupjs/auth/isomorphic'
import { Strategy as LocalStrategy } from '@startupjs/auth-local/server'

// Init startupjs ORM.
init({ orm })

// Check '@startupjs/server' readme for the full API
startupjsServer({
  secure: false, // TODO: https://github.com/startupjs/startupjs#security
  getHead,
  appRoutes: [
    ...getAuthRoutes(),
    ...getMainRoutes(),
    ...getAdminRoutes()
  ]
}, (ee, options) => {
  initApp(ee)
  initUi(ee, options)
  initAuth(ee, {
    strategies: [
      new LocalStrategy(),
    ],
  })


  ee.on('routes', expressApp => {
    expressApp.use('/api', api)
  })
})

function getHead(appName) {
  return `
    ${getUiHead()}
    <title>HelloWorld</title>
    <!-- Put vendor JS and CSS here -->
  `
}

export default function run() { }
