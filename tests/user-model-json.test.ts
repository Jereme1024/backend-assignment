import { User } from '../src/user-model'
import UserModelJson from '../src/user-model-json'
import { createError } from '../src/utils/errors'

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

    it('should verify successfully', async () => {
        const res1 = await dut!.verify(testUser1)
        expect(res1).toBeTruthy()

        const res2 = await dut!.verify(testUser2)
        expect(res2).toBeTruthy()
    })

    it('should verify failed with wrong user', async () => {
        const user1: User = { name: 'u3', password: 'u3' }
        const error = createError(401, 'Unauthorized')
        await expect(dut!.verify(user1)).rejects.toMatchObject(error)
    })

    it('should verify failed with wrong password', async () => {
        const user1: User = { name: 'u1', password: 'wrong' }
        const error = createError(401, 'Unauthorized')
        await expect(dut!.verify(user1)).rejects.toMatchObject(error)
    })
})
