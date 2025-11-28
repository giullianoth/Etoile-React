import type { ICategoriesFetchResponse, IErrorResponse, IPlatesFetchResponse } from "../types/response"
import { apiURL } from "./api"

// const platesUrl = `${apiURL}/plates`
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

const platesServices = {
    fetchCategories,
    fetchAvailableCategories,
    fetchPlates,
    fetchAvailablePlates
}

export default platesServices