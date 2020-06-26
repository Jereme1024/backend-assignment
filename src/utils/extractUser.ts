import { User } from '../user-model'

function extractUser(req: any): User | null {
    if (req.headers.name && req.headers.password) {
        return {
            name: req.headers.name,
            password: req.headers.password,
        }
    }
    return null
}

export default extractUser
