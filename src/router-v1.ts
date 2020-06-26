import express from 'express'
import { HeroModel } from './hero-model'
import { UserModel } from './user-model'
import extractUser from './utils/extractUser'
import { handleError } from './utils/errors'
import HeroModelJson from './hero-model-json'
import UserModelJson from './user-model-json'
import { heroDb } from './db/hero-db'
import { userDb } from './db/user-db'

const routerV1 = express.Router()
const heroModel: HeroModel = new HeroModelJson(heroDb)
const userModel: UserModel = new UserModelJson(userDb)

routerV1.get('/', (req, res) => {
    res.send('Hello World!')
})

routerV1.get('/heroes', async (req, res) => {
    try {
        const heroes = (await heroModel.getHeroes()).heroes
        const user = extractUser(req)
        if (user && (await userModel.verify(user))) {
            await Promise.all(
                heroes.map(async (hero) => {
                    hero.profile = await heroModel.getProfile(hero.id)
                })
            )
        }
        res.send({ heroes })
    } catch (error) {
        handleError(error, res)
    }
})

routerV1.get('/heroes/:heroId', async (req, res) => {
    try {
        const heroId = req.params.heroId
        const hero = await heroModel.getHero(heroId)
        const user = extractUser(req)
        if (user && (await userModel.verify(user))) {
            hero.profile = await heroModel.getProfile(heroId)
        }
        res.send(hero)
    } catch (error) {
        handleError(error, res)
    }
})

export default routerV1
