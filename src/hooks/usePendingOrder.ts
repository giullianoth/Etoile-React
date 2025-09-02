import { useState } from "react"
import type { IOrder, IOrderItem } from "../interfaces/order"

export const usePendingOrder = () => {
    const [pendingOrder, setPendingOrder] = useState<Partial<IOrder> | null>(null)
    const [pendingOrderItems, setPendingOrderItems] = useState<Partial<IOrderItem>[]>([])

    const setData = (orderData: Partial<IOrder>, orderItemsData: Partial<IOrderItem>[]) => {
        setPendingOrder(orderData)
        setPendingOrderItems(orderItemsData)
    }

    const getData = () => {
        const data = localStorage.getItem("etoile-pending-order")

        if (data) {
            setPendingOrder(JSON.parse(data).order)
            setPendingOrderItems(JSON.parse(data).orderItems)
        }
    }

    const saveOrder = () => localStorage.setItem("etoile-pending-order", JSON.stringify({
        pendingOrder,
        pendingOrderItems
    }))

    const clearOrder = () => {
        localStorage.removeItem("etoile-pending-order")
        setPendingOrder(null)
        setPendingOrderItems([])
    }

    return { pendingOrder, pendingOrderItems, setData, getData, saveOrder, clearOrder }
}