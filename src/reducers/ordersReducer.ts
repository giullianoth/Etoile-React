import { useReducer, useState } from "react"
import type { IOrderReducerState, IReducerAction } from "../interfaces/reducer-states"
import ordersServices from "../services/orders"

const initialState: IOrderReducerState = {
    success: false,
    loading: false,
    successMessage: null,
    errorMessage: null,
    orders: [],
    order: null
}

const ordersReducerActions = (state: IOrderReducerState, action: IReducerAction) => {
    switch (action.status) {
        case "pending":
            return {
                ...state,
                success: false,
                loading: true
            }

        case "rejected":
            return {
                ...state,
                success: false,
                loading: false,
                successMessage: null,
                errorMessage: action.message
            }

        case "fulfilled":
            return {
                success: true,
                loading: false,
                successMessage: action.message ?? action.message,
                errorMessage: null,
                orders: action.payload.list ?? state.orders,
                order: action.payload.data ?? state.order
            }

        case "reset":
            return initialState

        default:
            return state
    }
}

export const useOrdersReducer = () => {
    const [ordersState, dispatch] = useReducer<IOrderReducerState, [action: IReducerAction]>(ordersReducerActions, initialState)
    const [refetch, setRefetch] = useState<boolean>(true)

    const getOrdersByUser = async (userId: string) => {
        dispatch({ status: "pending" })

        const res = await ordersServices.getOrdersByUser(userId)

        if (!res.success) {
            dispatch({
                status: "rejected",
                message: res.body.text ?? "Erro ao recuperar pedidos."
            })

            setRefetch(false)
            return
        }

        dispatch({
            status: "fulfilled",
            payload: { list: res.body }
        })

        setRefetch(false)
    }

    return { ordersState, refetch, getOrdersByUser }
}