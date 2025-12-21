export interface IUser {
    _id: string
    fullname: string
    email: string
    password?: string
    role: "admin" | "user"
    phone?: string
    photo?: string
}

export interface IUserRegister extends IUser {
    confirmPassword: string
}

export interface IUserUpdate extends IUserRegister {
    changePassword: boolean
    newPassword: string
}