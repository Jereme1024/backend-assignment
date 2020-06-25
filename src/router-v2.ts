import express from 'express'
import axios from 'axios'
import extractUser from './utils/extractUser'
import { User } from './user-model'
import { Hero, Profile } from './hero-model'

const routerV2 = express.Router()

routerV2.get('/', (req, res) => {
    res.send('Hello World! V2')
})

routerV2.get('/heroes', async (req, res) => {
    const response = await axios.get(
        'https://hahow-recruit.herokuapp.com/heroes'
    )
    const heroes: Hero[] = response.data
    const user = extractUser(req)
    if (user && (await isAuthorized(user))) {
        await Promise.all(
            heroes.map(async (hero) => {
                const heroId = hero.id
                const res = await axios.get(
                    `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`
                )
                const profile: Profile = res.data
                hero.profile = profile
            })
        )
    }
    res.send({ heroes })
})

routerV2.get('/heroes/:heroId', async (req, res) => {
    const heroId = req.params.heroId
    const response = await axios.get(
        `https://hahow-recruit.herokuapp.com/heroes/${heroId}`
    )
    const hero: Hero = response.data
    const user = extractUser(req)
    if (user && (await isAuthorized(user))) {
        const res = await axios.get(
            `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`
        )
        const profile: Profile = res.data
        hero.profile = profile
    }
    res.send(hero)
})

async function isAuthorized(user: User): Promise<boolean> {
    try {
        const response = await axios.post(
            'https://hahow-recruit.herokuapp.com/auth',
            {
                name: user.name,
                password: user.password,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
        return response.status === 200
    } catch {
        return false
    }
}

export default routerV2
