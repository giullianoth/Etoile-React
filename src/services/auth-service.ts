import type { IAuthResponse, IErrorResponse } from "../types/response"
import type { IUserRegister } from "../types/user"
import { apiUrl } from "./api"

const register = async (registerData: Partial<IUserRegister>) => {
    try {
        const response = await fetch(`${apiUrl}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(registerData)
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

const login = async (registerData: Partial<IUserRegister>) => {
    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(registerData)
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

const authServices = { register, login }
export default authServices