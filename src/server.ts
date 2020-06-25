import express = require('express')
import { HeroModel } from './hero-model'

const app: express.Application = express()

const v1 = express.Router()

let heroModel: HeroModel

v1.get('/', (req, res) => {
    res.send('Hello World!')
})

v1.get('/heroes', (req, res) => {
    let isAuth = false
    let heroes = heroModel.getHeroes()
    if (!isAuth) {
        for (let hero of heroes) {
            delete hero.profile
        }
    }

    res.send(heroes)
})

v1.get('/heroes/:heroId', (req, res) => {
    let isAuth = false
    if (req.headers.name && req.headers.password) {
        isAuth = true
    }
    const heroId = req.params.heroId
    const hero = heroModel.getHero(heroId)
    if (!isAuth) {
        delete hero?.profile
    }
    res.send(hero ? hero : 'Not Found')
})

app.use('/v1', v1)
app.use('/', v1)

app.listen(3000, function () {
    console.log('App is listening on port 3000!')
})
