import express = require('express')
import { createRouterV1 } from './router-v1'
import routerV2 from './router-v2'

class App {
    app: express.Application

    constructor() {
        const app = express()
        const v1 = createRouterV1()
        app.use('/v1', v1.handle)
        app.use('/v2', routerV2)
        app.use('/', routerV2)

        this.app = app
    }
}

export default new App().app
