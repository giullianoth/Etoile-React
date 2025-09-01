import type { IUser, IUserRegister } from "../interfaces/user";
import { apiUrl } from "./api-config";

const register = async (authData: Partial<IUserRegister>) => {
    try {
        const res = await fetch(`${apiUrl}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authData)
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const login = async (authData: Partial<IUser>) => {
    try {
        const res = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authData)
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const authService = {
    register,
    login
}

export default authService