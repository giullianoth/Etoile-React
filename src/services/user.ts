import type { IErrorResponse, IUserDeleteResponse, IUserDeleteSuccessResponse, IUserFindResponse, IUserFindSuccessResponse, IUserMutateResponse, IUserMutateSuccessResponse, IUsersFetchResponse, IUsersFetchSuccessResponse } from "../types/api-response"
import { apiURL } from "./api"

const url = `${apiURL}/users`

const fetchUsers = async (): Promise<IUsersFetchResponse> => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())

        return response as IUsersFetchSuccessResponse
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

const findUserByEmail = async (userEmail: string): Promise<IUserFindResponse> => {
    try {
        const response = await fetch(`${url}/${userEmail}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())

        return response as IUserFindSuccessResponse
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

const createUser = async (userData: FormData): Promise<IUserMutateResponse> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: userData
        }).then(res => res.json())

        return response as IUserMutateSuccessResponse
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

const updateUser = async (userData: FormData, userId: string): Promise<IUserMutateResponse> => {
    try {
        const response = await fetch(`${url}/${userId}`, {
            method: "PUT",
            body: userData
        }).then(res => res.json())

        return response as IUserMutateSuccessResponse
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

const updateUserPhoto = async (photoData: FormData, userId: string): Promise<IUserMutateResponse> => {
    try {
        const response = await fetch(`${url}/${userId}/photo`, {
            method: "PATCH",
            body: photoData
        }).then(res => res.json())

        return response as IUserMutateSuccessResponse
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

const deleteUser = async (userId: string): Promise<IUserDeleteResponse> => {
    try {
        const response = await fetch(`${url}/${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())

        return response as IUserDeleteSuccessResponse
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
    fetchUsers,
    findUserByEmail,
    createUser,
    updateUser,
    updateUserPhoto,
    deleteUser,
}

export default usersServices