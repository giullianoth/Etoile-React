import type { IErrorResponse, IOrderDeleteResponse, IOrderDeleteSuccessResponse, IOrderMutateResponse, IOrderMutateSuccessResponse, IOrdersFetchResponse, IOrdersFetchSuccessResponse } from "../types/api-response"
import type { IOrderCreate, IOrderUpdate } from "../types/order"
import { apiURL } from "./api"

const url = `${apiURL}/orders`

const fetchOrders = async (): Promise<IOrdersFetchResponse> => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as IOrdersFetchSuccessResponse
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

const fetchOrdersByUser = async (userId: string): Promise<IOrdersFetchResponse> => {
    try {
        const response = await fetch(`${url}/by-user/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json())

        return response as IOrdersFetchSuccessResponse
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

const createOrder = async (orderData: Partial<IOrderCreate>): Promise<IOrderMutateResponse> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        }).then(res => res.json())

        return response as IOrderMutateSuccessResponse
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

const updateOrder = async (orderData: Partial<IOrderUpdate>, orderId: string): Promise<IOrderMutateResponse> => {
    try {
        const response = await fetch(`${url}/${orderId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        }).then(res => res.json())

        return response as IOrderMutateSuccessResponse
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

const concludeOrder = async (orderId: string): Promise<IOrderMutateResponse> => {
    try {
        const response = await fetch(`${url}/conclude/${orderId}`, {
            method: "PATCH"
        }).then(res => res.json())

        return response as IOrderMutateSuccessResponse
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

const cancelOrder = async (orderId: string): Promise<IOrderMutateResponse> => {
    try {
        const response = await fetch(`${url}/cancel/${orderId}`, {
            method: "PATCH"
        }).then(res => res.json())

        return response as IOrderMutateSuccessResponse
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

const cancelOrderItem = async (orderItemId: string): Promise<IOrderMutateResponse> => {
    try {
        const response = await fetch(`${url}/item/${orderItemId}`, {
            method: "DELETE"
        }).then(res => res.json())

        return response as IOrderMutateSuccessResponse
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

const deleteOrder = async (orderId: string): Promise<IOrderDeleteResponse> => {
    try {
        const response = await fetch(`${url}/${orderId}`, {
            method: "DELETE"
        }).then(res => res.json())

        return response as IOrderDeleteSuccessResponse
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
    concludeOrder,
    cancelOrder,
    cancelOrderItem,
    deleteOrder,
}

export default ordersServices