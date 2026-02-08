import type { IOrder, IOrderCreate } from "../types/order"
import type { IErrorResponse, IOrderFetchResponse, IOrdersCreateResponse, IOrdersDeleteResponse, IOrdersUpdateResponse } from "../types/response"
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

const updateOrder = async (orderData: Partial<IOrder>, orderId: string) => {
    try {
        const response = await fetch(`${url}/${orderId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        }).then(res => res.json())

        return response as IOrdersUpdateResponse
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

const cancelOrderItem = async (orderItemId: string) => {
    try {
        const response = await fetch(`${url}/item/${orderItemId}`, {
            method: "DELETE"
        }).then(res => res.json())

        return response as IOrdersUpdateResponse
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

const cancelOrder = async (orderId: string) => {
    try {
        const response = await fetch(`${url}/cancel/${orderId}`, {
            method: "PATCH"
        }).then(res => res.json())

        return response as IOrdersUpdateResponse
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

const deleteOrder = async (orderId: string) => {
    try {
        const response = await fetch(`${url}/${orderId}`, {
            method: "DELETE"
        }).then(res => res.json())

        return response as IOrdersDeleteResponse
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
    createOrder,
    updateOrder,
    cancelOrderItem,
    cancelOrder,
    deleteOrder
}

export default ordersServices