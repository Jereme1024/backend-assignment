import { Hero, HeroModel, Profile } from './hero-model'
import { HeroDbSchema } from './db/hero-db'
import { createError } from './utils/errors'

class HeroModelJson implements HeroModel {
    db: HeroDbSchema

    constructor(db: HeroDbSchema) {
        this.db = db
    }

    async getHeroes(): Promise<{ heroes: Hero[] }> {
        const result: { heroes: Hero[] } = { heroes: [] }
        for (const hero of this.db.heroes) {
            const h: Hero = Object.assign({}, hero)
            delete h.profile
            result.heroes.push(h)
        }
        return result
    }

    async getHero(id: string): Promise<Hero> {
        const hero = this.db.heroes.find((hero) => hero.id === id)
        if (hero) {
            const result = Object.assign({}, hero)
            delete result.profile
            return result
        } else {
            throw createError(404, 'Not Found')
        }
    }

    async getProfile(id: string): Promise<Profile> {
        const hero = this.db.heroes.find((hero) => hero.id === id)
        if (hero) {
            return Object.assign({}, hero.profile)
        } else {
            throw createError(404, 'Not Found')
        }
    }
}

export default HeroModelJson
