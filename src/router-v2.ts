import express = require('express')

const routerV2 = express.Router()

routerV2.get('/', (req, res) => {
    res.send('Hello World! V2')
})

export default routerV2
