import type { ICategoriesFetchResponse, ICategoriesFetchSuccessResponse, IErrorResponse, IPlateDeleteResponse, IPlateDeleteSuccessResponse, IPlateMutateResponse, IPlateMutateSuccessResponse, IPlatesFetchResponse, IPlatesFetchSuccessResponse } from "../types/api-response"
import type { ICategory } from "../types/plate"
import { apiURL } from "./api"

const categoriesUrl = `${apiURL}/categories`
const platesUrl = `${apiURL}/plates`

const fetchCategories = async (): Promise<ICategoriesFetchResponse> => {
    try {
        const response = await fetch(categoriesUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as ICategoriesFetchSuccessResponse
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

const fetchAvailableCategories = async (): Promise<ICategoriesFetchResponse> => {
    try {
        const response = await fetch(`${categoriesUrl}/available`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as ICategoriesFetchSuccessResponse
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

const fetchPlates = async (): Promise<IPlatesFetchResponse> => {
    try {
        const response = await fetch(platesUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as IPlatesFetchSuccessResponse
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

const fetchAvailablePlates = async (): Promise<IPlatesFetchResponse> => {
    try {
        const response = await fetch(`${platesUrl}/available`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as IPlatesFetchSuccessResponse
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

const createCategory = async (categoryData: Partial<ICategory>): Promise<IPlateMutateResponse> => {
    try {
        const response = await fetch(categoriesUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData)
        }).then(res => res.json())

        return response as IPlateMutateSuccessResponse
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

const createPlate = async (plateData: FormData): Promise<IPlateMutateResponse> => {
    try {
        const response = await fetch(platesUrl, {
            method: "POST",
            body: plateData
        }).then(res => res.json())

        return response as IPlateMutateSuccessResponse
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

const updateCategory = async (
    categoryData: Partial<ICategory>,
    categoryId: string
): Promise<IPlateMutateResponse> => {
    try {
        const response = await fetch(`${categoriesUrl}/${categoryId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData)
        }).then(res => res.json())

        return response as IPlateMutateSuccessResponse
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

const updatePlate = async (plateData: FormData, plateId: string): Promise<IPlateMutateResponse> => {
    try {
        const response = await fetch(`${platesUrl}/${plateId}`, {
            method: "PUT",
            body: plateData
        }).then(res => res.json())

        return response as IPlateMutateSuccessResponse
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

const deleteCategory = async (categoryId: string): Promise<IPlateDeleteResponse> => {
    try {
        const response = await fetch(`${categoriesUrl}/${categoryId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())

        return response as IPlateDeleteSuccessResponse
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

const deletePlate = async (plateId: string): Promise<IPlateDeleteResponse> => {
    try {
        const response = await fetch(`${platesUrl}/${plateId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())

        return response as IPlateDeleteSuccessResponse
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

const disablePlate = async (plateId: string): Promise<IPlateMutateResponse> => {
    try {
        const response = await fetch(`${platesUrl}/disable/${plateId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())

        return response as IPlateMutateSuccessResponse
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

const enablePlate = async (plateId: string): Promise<IPlateMutateResponse> => {
    try {
        const response = await fetch(`${platesUrl}/enable/${plateId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json())

        return response as IPlateMutateSuccessResponse
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

const platesServices = {
    fetchCategories,
    fetchAvailableCategories,
    fetchPlates,
    fetchAvailablePlates,
    createCategory,
    createPlate,
    updateCategory,
    updatePlate,
    deleteCategory,
    deletePlate,
    disablePlate,
    enablePlate,
}

export default platesServices