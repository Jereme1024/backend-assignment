import { User } from '../user-model'

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
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
