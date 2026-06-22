export interface IUser {
    _id: string
    fullname: string
    email: string
    role: "admin" | "user"
    phone?: string
    photo?: string
}

export interface IUserCreate extends IUser {
    password: string
    confirmPassword: string
}

export interface IUserUpdate extends IUserCreate {
    changePassword: boolean
    newPassword: string
}