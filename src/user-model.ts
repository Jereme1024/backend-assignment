type User = {
    name: string
    password: string
}

interface UserModel {
    getUser(name: string): User | null
}

export { User, UserModel }
