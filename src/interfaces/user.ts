export interface IUser {
    id: number
    name: string
    email: string
    password?: string
    photo?: string
    phone?: string
    role: "admin" | "user"
}