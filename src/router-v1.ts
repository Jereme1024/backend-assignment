import express from 'express'
import { HeroModel } from './hero-model'
import { UserModel } from './user-model'
import extractUser from './utils/extractUser'
import { handleError } from './utils/errors'
import HeroModelJson from './hero-model-json'
import UserModelJson from './user-model-json'
import { heroDb } from './db/hero-db'
import { userDb } from './db/user-db'

type Info = {
    version: string
    description: string
}

class RouterV1 {
    handle: express.Router
    info: Info
    heroModel: HeroModel
    userModel: UserModel

    constructor(info: Info, heroModel: HeroModel, userModel: UserModel) {
        this.handle = express.Router()
        this.info = info
        this.heroModel = heroModel
        this.userModel = userModel

        this.setup()
    }

    private setup() {
        const router = this.handle
        const heroModel = this.heroModel
        const userModel = this.userModel

        router.get('/info', (req, res) => {
            res.send(this.info)
        })

        router.get('/heroes', async (req, res) => {
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

        router.get('/heroes/:heroId', async (req, res) => {
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
    }
}

function createRouterV1() {
    return new RouterV1(
        {
            version: 'v1',
            description: 'standalone',
        },
        new HeroModelJson(heroDb),
        new UserModelJson(userDb)
    )
}

export { createRouterV1, RouterV1, Info }
