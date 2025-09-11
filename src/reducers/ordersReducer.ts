import { useReducer, useState } from "react";
import type { IOrderState, IReducerAction } from "../interfaces/reducer-state";
import ordersService from "../services/orders-service";
import type { IOrder, IOrderItem } from "../interfaces/order";

const initialState: IOrderState = {
    success: false,
    loading: false,
    errorMessage: null,
    successMessage: null,
    orders: [],
    order: null
}

const ordersReducerActions = (state: IOrderState, action: IReducerAction) => {
    switch (action.status) {
        case "pending":
            return {
                ...state,
                success: false,
                loading: true
            }

        case "fulfilled":
            return {
                success: true,
                loading: false,
                orders: action.payload.data ?? state.orders,
                order: action.payload.single ?? state.order,
                successMessage: action.payload.message,
                errorMessage: null
            }

        case "rejected":
            return {
                success: false,
                loading: false,
                errorMessage: action.payload,
                successMessage: null,
                orders: [],
                order: null
            }

        case "reset":
            return initialState

        default:
            return state
    }
}

export const ordersReducer = () => {
    const [ordersState, dispatch] = useReducer<IOrderState, [action: IReducerAction]>(ordersReducerActions, initialState)
    const [cancelled, setCancelled] = useState<boolean>(false)

    const resetState = () => dispatch({ status: "reset" })

    const getOrders = async () => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await ordersService.getOrders()

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao carregar pedidos."
            })

            setCancelled(true)
            return
        }

        dispatch({
            status: "fulfilled",
            payload: { data: res.body }
        })

        setCancelled(true)
    }

    const getOrdersByUser = async (userId: string) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await ordersService.getOrdersByUser(userId)

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Pedido não encontrado."
            })

            setCancelled(true)
            return
        }

        dispatch({
            status: "fulfilled",
            payload: { single: res.body }
        })

        setCancelled(true)
    }

    const addOrder = async (orderData: Partial<IOrder>, orderItems: Partial<IOrderItem>[]) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        if (!orderItems.length || orderItems.some(item => !item.plateId || item.quantity! < 1) || !orderData.status) {
            dispatch({ status: "rejected", payload: "Erro ao registrar pedido, verifique os dados." })
            setCancelled(true)
            return
        }

        if (!orderData.time) {
            dispatch({ status: "rejected", payload: "Selecione o horário de comparecimento." })
            setCancelled(true)
            return
        }

        if (!orderData.userDetails) {
            dispatch({ status: "rejected", payload: "Erro ao registrar pedido." })
            setCancelled(true)
            return
        }

        const res = await ordersService.addOrder(orderData)

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao registrar pedido."
            })

            setCancelled(true)
            return
        }

        await getOrders()

        dispatch({
            status: "fulfilled",
            payload: { message: "Pedido registrado com sucesso." }
        })

        setCancelled(true)
    }

    const deleteOrder = async (orderId: string) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await ordersService.deleteOrder(orderId)

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao excluir pedido."
            })

            setCancelled(true)
            return
        }

        await getOrders()

        dispatch({
            status: "fulfilled",
            payload: { message: "Pedido excluído com sucesso." }
        })

        setCancelled(true)
    }

    return { ordersState, cancelled, resetState, getOrders, getOrdersByUser, addOrder, deleteOrder }
}