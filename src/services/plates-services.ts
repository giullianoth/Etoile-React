import type { ICategory, IPlate } from "../types/plate"
import type { ICategoriesCreateResponse, ICategoriesDeleteResponse, ICategoriesFetchResponse, ICategoriesUpdateResponse, IErrorResponse, IPlatesCreateResponse, IPlatesDeleteResponse, IPlatesFetchResponse, IPlatesUpdateResponse } from "../types/response"
import { apiURL } from "./api"

const categoriesUrl = `${apiURL}/categories`
const platesUrl = `${apiURL}/plates`

const fetchCategories = async () => {
    try {
        const response = await fetch(categoriesUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as ICategoriesFetchResponse
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

const fetchAvailableCategories = async () => {
    try {
        const response = await fetch(`${categoriesUrl}/available`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as ICategoriesFetchResponse
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

const createCategory = async (categoryData: Partial<ICategory>) => {
    try {
        const response = await fetch(categoriesUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData)
        }).then(res => res.json())

        return response as ICategoriesCreateResponse
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

const updateCategory = async (categoryData: Partial<ICategory>, categoryId: string) => {
    try {
        const response = await fetch(`${categoriesUrl}/${categoryId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData)
        }).then(res => res.json())

        return response as ICategoriesUpdateResponse
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

const deleteCategory = async (categoryId: string) => {
    try {
        const response = await fetch(`${categoriesUrl}/${categoryId}`, {
            method: "DELETE"
        }).then(res => res.json())

        return response as ICategoriesDeleteResponse
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

const fetchPlates = async () => {
    try {
        const response = await fetch(platesUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as IPlatesFetchResponse
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

const fetchAvailablePlates = async () => {
    try {
        const response = await fetch(`${platesUrl}/available`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as IPlatesFetchResponse
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

const createPlate = async (plateData: Partial<IPlate>) => {
    try {
        const response = await fetch(platesUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plateData)
        }).then(res => res.json())

        return response as IPlatesCreateResponse
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

const updatePlate = async (plateData: FormData, plateId: string) => {
    try {
        const response = await fetch(`${platesUrl}/${plateId}`, {
            method: "PUT",
            body: plateData
        }).then(res => res.json())

        return response as IPlatesUpdateResponse
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

const deletePlate = async (plateId: string) => {
    try {
        const response = await fetch(`${platesUrl}/${plateId}`, {
            method: "DELETE"
        }).then(res => res.json())

        return response as IPlatesDeleteResponse
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
    deletePlate
}

export default platesServices