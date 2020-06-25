import { User, UserModel } from './user-model'

class UserModelJson implements UserModel {
    db: { [key: string]: User }

    constructor(db: User[]) {
        this.db = {}
        for (const user of db) {
            this.db[user.name] = user
        }
    }

    getUser(name: string): User | null {
        if (name in this.db) {
            return this.db[name]
        }
        return null
    }
}

export { UserModelJson }
