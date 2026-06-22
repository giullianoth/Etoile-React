import type { IAuthResponse, IAuthSuccessResponse, IErrorResponse } from "../types/api-response"
import type { IUserCreate } from "../types/user"
import { apiURL } from "./api"

const url = `${apiURL}/auth`

const login = async (userData: Partial<IUserCreate>): Promise<IAuthResponse> => {
    try {
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        }).then(res => res.json())

        return response as IAuthSuccessResponse
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

const signup = async (userData: Partial<IUserCreate>): Promise<IAuthResponse> => {
    try {
        const response = await fetch(`${url}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        }).then(res => res.json())

        return response as IAuthSuccessResponse
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

const authServices = { login, signup }
export default authServices