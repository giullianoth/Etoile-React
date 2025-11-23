import type { IErrorResponse, IOrderFetchResponse } from "../types/response"
import { apiURL } from "./api"

const url = `${apiURL}/orders`

const fetchOrders = async () => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as IOrderFetchResponse
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

const fetchOrdersByUser = async (userId: string) => {
    try {
        const response = await fetch(`${url}/by-user/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as IOrderFetchResponse
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

const ordersServices = {
    fetchOrders,
    fetchOrdersByUser
}

export default ordersServices