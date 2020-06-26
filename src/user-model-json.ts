import { User, UserModel } from './user-model'
import { createError } from './utils/errors'

class UserModelJson implements UserModel {
    db: { [key: string]: User }

    constructor(db: User[]) {
        this.db = {}
        for (const user of db) {
            this.db[user.name] = user
        }
    }

    async verify(user: User): Promise<boolean> {
        const target = this.getUser(user.name)
        if (target) {
            if (target.password !== user.password) {
                throw createError(401, 'Unauthorized')
            } else {
                return true
            }
        } else {
            throw createError(401, 'Unauthorized')
        }
    }

    private getUser(name: string): User | null {
        if (name in this.db) {
            return this.db[name]
        }
        return null
    }
}

export default UserModelJson
