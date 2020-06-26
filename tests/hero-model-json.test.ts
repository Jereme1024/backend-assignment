import HeroModelJson from '../src/hero-model-json'
import { HeroDbSchema } from '../src/db/hero-db'
import { Hero } from '../src/hero-model'
import { createError } from '../src/utils/errors'

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

    it('should get all heroes', async () => {
        let heroes = await dut!.getHeroes()
        let expectedHero1 = Object.assign({}, testHero1)
        delete expectedHero1.profile
        let expectedHero2 = Object.assign({}, testHero2)
        delete expectedHero2.profile
        expect(heroes).toEqual({ heroes: [expectedHero1, expectedHero2] })
    })

    it('should get a hero by id', async () => {
        let hero = await dut!.getHero('1')
        let expectedHero1 = Object.assign({}, testHero1)
        delete expectedHero1.profile
        expect(hero).toEqual(expectedHero1)
    })

    it('should get a profile by id', async () => {
        let profile = await dut!.getProfile('1')
        let expectedProfile = testHero1.profile
        expect(profile).toEqual(expectedProfile)
    })

    it('should not get a hero by wrong id', async () => {
        let error = createError(404, 'Not Found')
        await expect(dut!.getHero('123')).rejects.toMatchObject(error)
    })

    it('should not get a profile by wrong id', async () => {
        let error = createError(404, 'Not Found')
        await expect(dut!.getProfile('123')).rejects.toMatchObject(error)
    })
})
