import { Hero, HeroModel } from './hero-model'
import { HeroDbSchema } from './db/hero-db'

class HeroModelJson implements HeroModel {
    db: HeroDbSchema

    constructor(db: HeroDbSchema) {
        this.db = db
    }

    getHeroes(): Hero[] {
        return this.db.heroes
    }

    getHero(id: string): Hero | null {
        const hero = this.db.heroes.find((hero) => hero.id === id)
        return hero ? hero : null
    }
}

export default HeroModelJson
