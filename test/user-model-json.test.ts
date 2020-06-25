import { User } from '../src/user-model'
import { UserModelJson } from '../src/user-model-json'

describe('Test UserModelJson', () => {
    const testUser1: User = {
        name: 'u1',
        password: 'p1',
    }

    const testUser2: User = {
        name: 'u2',
        password: 'p2',
    }

    const testDb: User[] = [testUser1, testUser2]

    let dut: UserModelJson | null = null
    beforeEach(() => {
        dut = new UserModelJson(testDb)
    })

    it('should get a hero by name', () => {
        let user1 = dut!.getUser(testUser1.name)
        expect(user1).toEqual(testUser1)

        let user2 = dut!.getUser(testUser2.name)
        expect(user2).toEqual(testUser2)
    })

    it('should not get a hero by wrong name', () => {
        let user = dut!.getUser('wrong name')
        expect(user).toBeNull()
    })
})
