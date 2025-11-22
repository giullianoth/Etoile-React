export interface IUser {
    _id: string
    fullname: string
    email: string
    password?: string
    role: "admin" | "user"
    phone?: string
}

export interface IUserRegister extends IUser {
    confirmPassword: string
}