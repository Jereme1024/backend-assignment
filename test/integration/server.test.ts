import request from 'supertest'
import app from '../../src/server'
import { BackendErrro } from '../../src/utils/errors'

beforeEach(() => {
    const timeoutMs = 10 * 1000
    jest.setTimeout(timeoutMs)
})

describe('Test Server', () => {
    it('should get a welcome message', async () => {
        const res = await request(app).get('/').expect(200)
        expect(res.text.includes('Hello World')).toBeTruthy()
    })

    it('should get heroes', async () => {
        const res = await request(app).get('/heroes').expect(200)
        expectHeroesFormat(res.body.heroes, expectHeroFormat)
    })

    it('should get a heroes', async () => {
        const res = await request(app).get('/heroes/1').expect(200)
        const data = res.body
        if (data.id) {
            expectHeroFormat(data)
        } else {
            expect(data).toMatchObject(BackendErrro)
        }
    })

    it('should not get a heroes if not existed', async () => {
        const res = await request(app).get('/heroes/5566').expect(404)
    })
})

describe('Test Server with custom headers', () => {
    it('should get heroes with good auth', async () => {
        const res = await request(app)
            .get('/heroes')
            .set('Name', 'hahow')
            .set('Password', 'rocks')
            .expect(200)
        expectHeroesFormat(res.body.heroes, expectHeroFormat)
    })

    it('should get a heroes with good auth', async () => {
        const res = await request(app)
            .get('/heroes/1')
            .set('Name', 'hahow')
            .set('Password', 'rocks')
            .expect(200)
        const data = res.body
        if (data.id) {
            expectHeroProfileFormat(data)
        } else {
            expect(data).toMatchObject(BackendErrro)
        }
    })

    it('should not get heroes with bad auth', async () => {
        const res = await request(app)
            .get('/heroes')
            .set('Name', 'hahow')
            .set('Password', 'xxx')
            .expect(401)
    })

    it('should get heroes with incompleted auth format', async () => {
        const res = await request(app)
            .get('/heroes')
            .set('Name', 'hahow')
            .expect(200)
        expectHeroesFormat(res.body.heroes, expectHeroFormat)
    })

    it('should get heroes with random headers', async () => {
        const res = await request(app)
            .get('/heroes')
            .set('Name', 'hahow')
            .set('Any', 'stuffs')
            .expect(200)
        expectHeroesFormat(res.body.heroes, expectHeroFormat)
    })
})

// helpers
function expectHeroesFormat(heroes: any, expectHeroFormat: any, count = -1) {
    if (count === -1) {
        expect(heroes.length).toBeGreaterThan(0)
    } else {
        expect(heroes.length).toBe(count)
    }

    for (const hero of heroes) {
        expectHeroFormat(hero)
    }
}

function expectHeroFormat(hero: any) {
    expect(Object.keys(hero)).toEqual(
        expect.arrayContaining(['id', 'name', 'image'])
    )
}

function expectHeroProfileFormat(hero: any) {
    expect(Object.keys(hero)).toEqual(
        expect.arrayContaining(['id', 'name', 'image', 'profile'])
    )
    expect(Object.keys(hero.profile)).toEqual(
        expect.arrayContaining(['str', 'int', 'agi', 'luk'])
    )
}