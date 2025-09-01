export interface IUser {
    _id: string
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

export interface IUserUpdate extends IUserRegister {
    changePassword?: boolean
    newPassword?: string
}