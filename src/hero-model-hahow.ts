import { HeroModel, Hero, Profile } from './hero-model'
import axios, { AxiosResponse, AxiosInstance } from 'axios'
import createRetryStatus200Axios from './utils/createRetryStatus200Axios'

class HeroModelHahow implements HeroModel {
    axiosHero: AxiosInstance

    constructor() {
        this.axiosHero = createRetryStatus200Axios(
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
    }

    async getHeroes(): Promise<{ heroes: Hero[] }> {
        const response = await axios.get(
            'https://hahow-recruit.herokuapp.com/heroes'
        )
        const heroes: Hero[] = response.data
        return { heroes }
    }

    async getHero(id: string): Promise<Hero> {
        const response = await this.axiosHero.get(
            `https://hahow-recruit.herokuapp.com/heroes/${id}`
        )
        const hero: Hero = response.data
        return response.data
    }

    async getProfile(id: string): Promise<Profile> {
        const res = await axios.get(
            `https://hahow-recruit.herokuapp.com/heroes/${id}/profile`
        )
        const profile: Profile = res.data
        return profile
    }
}

export default HeroModelHahow
