import type { IUserRegister } from "../types/user"
import { apiURL } from "./api"
import type { IAuthResponse, IErrorResponse } from "../types/response"

const url = `${apiURL}/auth`

const login = async (userData: Partial<IUserRegister>) => {
    try {
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        }).then(res => res.json())

        return response as IAuthResponse
    } catch (error) {
        console.error(error)

        return {
            success: false,
            statusCode: 500,
            body: {
                text: "Erro de rede ou comunicação com o servidor."
            }
        } as IErrorResponse
    }
}

const register = async (userData: Partial<IUserRegister>) => {
    try {
        const response = await fetch(`${url}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        }).then(res => res.json())

        return response as IAuthResponse
    } catch (error) {
        console.error(error)

        return {
            success: false,
            statusCode: 500,
            body: {
                text: "Erro de rede ou comunicação com o servidor."
            }
        } as IErrorResponse
    }
}

const authServices = { login, register }

export default authServices