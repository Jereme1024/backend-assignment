import express = require('express')
import { createRouterV1 } from './router-v1'
import { createRouterV2 } from './router-v2'

class App {
    app: express.Application

    constructor() {
        const app = express()
        const v1 = createRouterV1()
        const v2 = createRouterV2()
        app.use('/v1', v1)
        app.use('/v2', v2)
        app.use('/', v2)

        this.app = app
    }
}

export default new App().app
