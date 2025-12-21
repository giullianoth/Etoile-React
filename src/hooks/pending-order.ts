import { useCallback, useState } from "react"
import type { IOrderCreate } from "../types/order"

const storagedPendingOrder = () => localStorage.getItem("etoile-pending-order")

export const usePendingOrder = () => {
    const [pendingOrder, setPendingOrder] = useState<Partial<IOrderCreate> | null>(
        storagedPendingOrder() ? JSON.parse(storagedPendingOrder()!) : null
    )

    const addPendingOrder = useCallback((order: Partial<IOrderCreate>) => {
        localStorage.setItem("etoile-pending-order", JSON.stringify(order))
        setPendingOrder(order)
    }, [])

    const removePendingOrder = useCallback(() => {
        localStorage.removeItem("etoile-pending-order")
        setPendingOrder(null)
    }, [])

    return { pendingOrder, addPendingOrder, removePendingOrder }
}