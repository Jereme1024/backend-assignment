import express from 'express'
import axios, { AxiosResponse } from 'axios'
import extractUser from './utils/extractUser'
import { User } from './user-model'
import { Hero, Profile } from './hero-model'
import createRetryStatus200Axios from './utils/createRetryStatus200Axios'

const routerV2 = express.Router()

const axiosHero = createRetryStatus200Axios(
    (res: AxiosResponse) => {
        const data = JSON.parse(res.data)
        const isHero = data.id && data.name && data.image
        if (!isHero) {
            console.log(data)
        }
        return isHero
    },
    {
        retries: 2,
        retryDelay: (retryCount: number) => {
            console.log(`Retrying... ${retryCount}`)
            return retryCount * 50
        },
    }
)

routerV2.get('/', (req, res) => {
    res.send('Hello World! V2')
})

routerV2.get('/heroes', async (req, res) => {
    try {
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
    } catch (error) {
        handleError(error, res)
    }
})

routerV2.get('/heroes/:heroId', async (req, res) => {
    try {
        const heroId = req.params.heroId
        const response = await axiosHero.get(
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
    } catch (error) {
        handleError(error, res)
    }
})

async function isAuthorized(user: User): Promise<boolean> {
    const response = await axios.post(
        'https://hahow-recruit.herokuapp.com/auth',
        user,
        {
            headers: { 'Content-Type': 'application/json' },
        }
    )
    return response.status === 200
}

function handleError(error: any, res: any) {
    // eslint-disable-line
    const directlyPassThrough = error.response && error.response.status != 1000
    if (directlyPassThrough) {
        res.status(error.response.status).send(error.response.data)
    } else {
        // it will get a [ERR_HTTP_INVALID_STATUS_CODE] error when send with status code 1000
        res.status(200).send({ code: 1000, message: 'Backend error' })
    }
}

export default routerV2
