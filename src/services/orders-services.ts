import type { IOrderCreate } from "../types/order"
import type { IErrorResponse, IOrderFetchResponse, IOrdersCreateResponse } from "../types/response"
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

const createOrder = async (orderData: Partial<IOrderCreate>) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        }).then(res => res.json())

        return response as IOrdersCreateResponse
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
    fetchOrdersByUser,
    createOrder
}

export default ordersServices