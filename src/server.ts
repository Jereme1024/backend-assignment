import express = require('express')
import routerV1 from './router-v1'

const app: express.Application = express()

app.use('/v1', routerV1)
app.use('/', routerV1)

app.listen(3000, function () {
    console.log('App is listening on port 3000!')
})
