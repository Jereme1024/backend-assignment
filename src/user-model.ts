type User = {
    name: string
    password: string
}

interface UserModel {
    verify(user: User): Promise<boolean>
}

export { User, UserModel }
