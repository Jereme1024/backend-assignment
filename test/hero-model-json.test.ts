import HeroModelJson from '../src/hero-model-json'
import { HeroDbSchema } from '../src/db/hero-db'
import { Hero } from '../src/hero-model'

describe('Test HeroModelJson', () => {
    const testHero1: Hero = {
        id: '1',
        name: 'h1',
        image: 'i1',
        profile: {
            str: 11,
            int: 12,
            agi: 13,
            luk: 14,
        },
    }
    const testHero2: Hero = {
        id: '2',
        name: 'h2',
        image: 'i2',
        profile: {
            str: 21,
            int: 22,
            agi: 23,
            luk: 24,
        },
    }

    const testDb: HeroDbSchema = {
        heroes: [testHero1, testHero2],
    }

    let dut: HeroModelJson | null = null
    beforeEach(() => {
        dut = new HeroModelJson(testDb)
    })

    it('should get all heroes', () => {
        let heroes = dut!.getHeroes()
        expect(heroes).toEqual([testHero1, testHero2])
    })

    it('should get a hero by id', () => {
        let hero = dut!.getHero('1')
        expect(hero).toEqual(testHero1)
    })

    it('should not get a hero by empty id', () => {
        let hero = dut!.getHero('')
        expect(hero).toBeNull()
    })

    it('should not get a hero by wrong id', () => {
        let hero = dut!.getHero('123')
        expect(hero).toBeNull()
    })
})
