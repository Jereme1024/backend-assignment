import express = require('express')
import { HeroModel } from './hero-model'
import { UserModel, User } from './user-model'
import HeroModelJson from './hero-model-json'
import { heroDb } from './hero-db'
import UserModelJson from './user-model-json'
import { userDb } from './user-db'

const routerV1 = express.Router()
const heroModel: HeroModel = new HeroModelJson(heroDb)
const userModel: UserModel = new UserModelJson(userDb)

function verfiyUser(user: User) {
    if (user) {
        const target = userModel.getUser(user.name)
        if (target) {
            return target.password === user.password
        }
    }
    return false
}

function extractUserFromReq(req: any): User | null {
    if (req.headers.name && req.headers.password) {
        const user: User = {
            name: req.headers.name,
            password: req.headers.password,
        }
        return user
    }
    return null
}

routerV1.get('/', (req, res) => {
    res.send('Hello World!')
})

routerV1.get('/heroes', (req, res) => {
    let isAuth = false
    const user = extractUserFromReq(req)
    if (user) {
        isAuth = verfiyUser(user)
    }

    const heroes = heroModel.getHeroes()
    if (!isAuth) {
        for (const hero of heroes) {
            delete hero.profile
        }
    }

    res.send(heroes)
})

routerV1.get('/heroes/:heroId', (req, res) => {
    let isAuth = false
    const user = extractUserFromReq(req)
    if (user) {
        isAuth = verfiyUser(user)
    }

    const heroId = req.params.heroId
    const hero = heroModel.getHero(heroId)
    if (!isAuth) {
        delete hero?.profile
    }
    res.send(hero ? hero : 'Not Found')
})

export default routerV1
