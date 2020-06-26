import express from 'express'
import { HeroModel } from './hero-model'
import { UserModel, User } from './user-model'
import HeroModelJson from './hero-model-json'
import { heroDb } from './db/hero-db'
import UserModelJson from './user-model-json'
import { userDb } from './db/user-db'
import extractUser from './utils/extractUser'

const routerV1 = express.Router()
const heroModel: HeroModel = new HeroModelJson(heroDb)
const userModel: UserModel = new UserModelJson(userDb)

routerV1.get('/', (req, res) => {
    res.send('Hello World!')
})

routerV1.get('/heroes', (req, res) => {
    let isAuth = false
    const user = extractUser(req)
    if (user) {
        isAuth = isAuthorized(user)
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
    const user = extractUser(req)
    if (user) {
        isAuth = isAuthorized(user)
    }

    const heroId = req.params.heroId
    const hero = heroModel.getHero(heroId)
    if (!isAuth) {
        delete hero?.profile
    }
    res.send(hero ? hero : 'Not Found')
})

function isAuthorized(user: User) {
    if (user) {
        const target = userModel.getUser(user.name)
        if (target) {
            return target.password === user.password
        }
    }
    return false
}

export default routerV1
