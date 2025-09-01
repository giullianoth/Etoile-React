export interface IUser {
    id: number
    fullname: string
    email: string
    password?: string
    photo?: string
    phone?: string
    role: string
}

export interface IUserRegister extends IUser {
    confirmPassword?: string
}