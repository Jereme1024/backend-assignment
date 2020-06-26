import express = require('express')
import routerV1 from './router-v1'
import routerV2 from './router-v2'

const app: express.Application = express()

app.use('/v1', routerV1)
app.use('/v2', routerV2)
app.use('/', routerV2)

export default app
