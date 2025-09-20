import type { IUser, IUserRegister } from "../interfaces/user"

const apiUrl = "http://localhost:3000/auth"

const login = async (userData: Partial<IUser>) => {
    try {
        const res = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const register = async (userData: Partial<IUserRegister>) => {
    try {
        const res = await fetch(`${apiUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const authServices = { login, register }

export default authServices