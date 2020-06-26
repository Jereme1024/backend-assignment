import { UserModel, User } from './user-model'
import axios from 'axios'

class UserModelHaHow implements UserModel {
    constructor() {}

    async verify(user: User): Promise<boolean> {
        const response = await axios.post(
            'https://hahow-recruit.herokuapp.com/auth',
            user,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
        return response.status === 200
    }
}

export default UserModelHaHow
