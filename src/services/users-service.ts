import type { IErrorResponse, IUserUpdateResponse } from "../types/response"
import type { IUserRegister } from "../types/user"
import { apiURL } from "./api"

const url = `${apiURL}/users`

const updateUser = async (userData: Partial<IUserRegister>, userId: string) => {
    try {
        const response = await fetch(`${url}/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        }).then(res => res.json())

        return response as IUserUpdateResponse
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

const updateUserPhoto = async (photoData: FormData, userId: string) => {
    try {
        const response = await fetch(`${url}/${userId}/photo`, {
            method: "PATCH",
            body: photoData
        }).then(res => res.json())

        return response as IUserUpdateResponse
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

const usersServices = {
    updateUser,
    updateUserPhoto
}

export default usersServices