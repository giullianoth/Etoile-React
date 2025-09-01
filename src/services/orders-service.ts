import type { IOrder } from "../interfaces/order"
import { apiUrl } from "./api-config"

const getOrders = async () => {
    try {
        const res = await fetch(`${apiUrl}/orders`, {
            method: "GET",
            headers: {}
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const getOrdersByUser = async (userId: string) => {
    try {
        const res = await fetch(`${apiUrl}/orders/by-user/${userId}`, {
            method: "GET",
            headers: {}
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const addOrder = async (orderData: Partial<IOrder>) => {
    try {
        const res = await fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const deleteOrder = async (orderId: string) => {
    try {
        const res = await fetch(`${apiUrl}/orders/${orderId}`, {
            method: "DELETE",
            headers: {}
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const ordersService = {
    getOrders,
    getOrdersByUser,
    addOrder,
    deleteOrder
}

export default ordersService