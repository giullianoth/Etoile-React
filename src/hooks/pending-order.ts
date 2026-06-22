import { useCallback, useState } from "react"
import type { IOrderCreate } from "../types/order"
import type { IMessageType } from "../types/message"

const storagedPendingOrder = () => localStorage.getItem("etoile-pending-order")

export const usePendingOrder = () => {
    const [pendingOrder, setPendingOrder] = useState<Partial<IOrderCreate> | null>(
        storagedPendingOrder() ? JSON.parse(storagedPendingOrder()!) : null
    )

    const [pendingOrderMessage, setPendingOrderMessage] = useState<string | null>(null)
    const [pendingOrderMessageType, setPendingOrderMessageType] = useState<IMessageType>("success")

    const addPendingOrder = useCallback((order: Partial<IOrderCreate>) => {
        localStorage.setItem("etoile-pending-order", JSON.stringify(order))
        setPendingOrder(order)
    }, [])

    const removePendingOrder = useCallback(() => {
        localStorage.removeItem("etoile-pending-order")
        setPendingOrder(null)
    }, [])

    const addPendingOrderMessage = useCallback((message: string, type: IMessageType = "success") => {
        setPendingOrderMessage(message)
        setPendingOrderMessageType(type)
    }, [])

    const clearPendingOrderMessage = useCallback(() => {
        setPendingOrderMessage(null)
        setPendingOrderMessageType("success")
    }, [])

    return {
        pendingOrder,
        pendingOrderMessage,
        pendingOrderMessageType,
        addPendingOrder,
        removePendingOrder,
        addPendingOrderMessage,
        clearPendingOrderMessage
    }
}