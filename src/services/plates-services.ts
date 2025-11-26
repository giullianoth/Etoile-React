import type { ICategoriesFetchResponse, IErrorResponse } from "../types/response"
import { apiURL } from "./api"

// const platesUrl = `${apiURL}/plates`
const categoriesUrl = `${apiURL}/categories`

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

const platesServices = {
    fetchCategories
}

export default platesServices