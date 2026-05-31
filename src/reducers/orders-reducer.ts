import { useCallback, useReducer } from "react";
import type { IOrdersActions, IOrdersState } from "../types/reducer-states";
import type { IOrder, IOrderCreate } from "../types/order";
import { useDateFormats } from "../hooks/date-formats";
import ordersServices from "../services/orders-services";

const initialState: IOrdersState = {
    loading: false,
    success: false,
    errorMessage: null,
    successMessage: null,
    orders: [],
    currentOrder: null,
    fetching: false,
    fetchErrorMessage: null,
    cancellingOrderItem: false,
}

const ordersReducerActions = (state: IOrdersState, action: IOrdersActions): IOrdersState => {
    let updatedOrders: IOrder[]
    let updatedOrdersAfterCancelItem: IOrder[]
    let updatedCurrentOrder: IOrder | null
    let updatedOrdersAfterDelete: IOrder[]

    switch (action.type) {
        case "SET_ORDER_TO_EDIT":
            return {
                ...state,
                currentOrder: action.payload
            }

        case "ORDERS_FETCH_START":
            return {
                ...state,
                fetching: true,
                success: false,
                successMessage: null,
                fetchErrorMessage: null
            }

        case "ORDERS_CANCEL_ITEM_START":
            return {
                ...state,
                cancellingOrderItem: true,
                success: false,
                successMessage: null,
                errorMessage: null
            }

        case "ORDERS_CREATE_START":
        case "ORDERS_UPDATE_START":
        case "ORDERS_DELETE_START":
            return {
                ...state,
                loading: true,
                success: false,
                successMessage: null,
                errorMessage: null
            }

        case "ORDERS_FETCH_SUCCESS":
            return {
                ...state,
                fetching: false,
                success: true,
                fetchErrorMessage: null,
                orders: action.payload
            }

        case "ORDERS_CREATE_SUCCESS":
            return {
                ...state,
                loading: false,
                success: true,
                errorMessage: null,
                successMessage: action.payload.message,
                orders: [...state.orders, action.payload.order]
            }

        case "ORDERS_UPDATE_SUCCESS":
            updatedOrders = state.orders.map(order => order._id === action.payload.orderResult._id
                ? { ...order, ...action.payload.orderResult }
                : order)

            return {
                ...state,
                loading: false,
                success: true,
                errorMessage: null,
                successMessage: action.payload.message,
                orders: updatedOrders,
                currentOrder: { ...state.currentOrder, ...action.payload.orderResult }
            }

        case "ORDERS_CANCEL_ITEM_SUCCESS":
            updatedOrdersAfterCancelItem = state.orders.map(order => {
                const isTargetOrder = order._id === action.payload.orderResult.orderId

                if (isTargetOrder || !action.payload.orderResult.orderId) {
                    return {
                        ...order,
                        orderItems: order.orderItems.filter(item => item._id !== action.payload.orderResult._id)
                    }
                }

                return order
            })

            updatedCurrentOrder = state.currentOrder
                ? {
                    ...state.currentOrder,
                    orderItems: state.currentOrder.orderItems.filter(item =>
                        item._id !== action.payload.orderResult._id)
                }
                : null

            return {
                ...state,
                cancellingOrderItem: false,
                success: true,
                errorMessage: null,
                successMessage: action.payload.message,
                orders: updatedOrdersAfterCancelItem,
                currentOrder: updatedCurrentOrder
            }

        case "ORDERS_DELETE_SUCCESS":
            updatedOrdersAfterDelete = state.orders.filter(order =>
                order._id !== action.payload.orderId)

            return {
                ...state,
                loading: false,
                success: true,
                errorMessage: null,
                successMessage: action.payload.message,
                orders: updatedOrdersAfterDelete
            }

        case "ORDERS_FETCH_FAILURE":
            return {
                ...state,
                fetching: false,
                success: false,
                successMessage: null,
                fetchErrorMessage: action.payload
            }

        case "ORDERS_CREATE_FAILURE":
        case "ORDERS_UPDATE_FAILURE":
        case "ORDERS_CANCEL_ITEM_FAILURE":
        case "ORDERS_DELETE_FAILURE":
            return {
                ...state,
                cancellingOrderItem: false,
                loading: false,
                success: false,
                successMessage: null,
                errorMessage: action.payload
            }

        case "ORDERS_RESET":
            return initialState

        default:
            return state
    }
}

export const useOrdersReducer = () => {
    const [ordersState, dispatch] = useReducer<
        IOrdersState,
        [action: IOrdersActions]
    >(ordersReducerActions, initialState)

    const { isPastDate, combineDateAndTime, defaultDateFormat, timeFormat } = useDateFormats()

    const handleSetOrderToEdit = useCallback((order: IOrder | null) => {
        dispatch({ type: "SET_ORDER_TO_EDIT", payload: order })
    }, [])

    const handleResetOrders = useCallback(() => {
        dispatch({ type: "ORDERS_RESET" })
    }, [])

    const handleFetchOrders = useCallback(async () => {

    }, [])

    const handleFetchOrdersByUser = useCallback(async (userId: string) => {
        dispatch({ type: "ORDERS_FETCH_START" })

        if (!userId) {
            dispatch({
                type: "ORDERS_FETCH_FAILURE",
                payload: "Erro inesperado ao buscar pedidos."
            })
            return
        }

        const response = await ordersServices.fetchOrdersByUser(userId)

        if (!response.success) {
            dispatch({
                type: "ORDERS_FETCH_FAILURE",
                payload: response.body.text || "Erro inesperado ao buscar pedidos."
            })
            return
        }

        dispatch({
            type: "ORDERS_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleCreateOrder = useCallback(async (
        orderItems: IOrderCreate["items"],
        orderDate: Date,
        orderTime: string,
        userId: string
    ) => {
        dispatch({ type: "ORDERS_CREATE_START" })

        if (!orderItems || !orderItems.length || !orderDate || !userId) {
            dispatch({
                type: "ORDERS_CREATE_FAILURE",
                payload: "Erro inesperado ao registrar pedido."
            })
            return
        }

        if (!orderTime) {
            dispatch({
                type: "ORDERS_CREATE_FAILURE",
                payload: "Preencha corretamente o horário."
            })
            return
        }

        const currentDate = combineDateAndTime(orderDate, orderTime)

        if (isPastDate(currentDate!)) {
            dispatch({
                type: "ORDERS_CREATE_FAILURE",
                payload: "Data / horário inválido."
            })
            return
        }

        const response = await ordersServices.createOrder({
            userId,
            time: `${defaultDateFormat(currentDate!)} ${timeFormat(currentDate!)}`,
            items: orderItems
        })

        if (!response.success) {
            dispatch({
                type: "ORDERS_CREATE_FAILURE",
                payload: response.body.text || "Erro ao registrar pedido."
            })
            return
        }

        dispatch({
            type: "ORDERS_CREATE_SUCCESS",
            payload: {
                order: response.body,
                message: "Pedido registrado com sucesso."
            }
        })
    }, [isPastDate, combineDateAndTime, defaultDateFormat, timeFormat])

    const handleUpdateOrder = useCallback(async (orderDate: Date | null) => {

    }, [])

    const handleCancelOrderItem = useCallback(async (orderItemId: string) => {

    }, [])

    const handleCancelOrder = useCallback(async (orderId: string) => {

    }, [])

    const handleDeleteOrder = useCallback(async (orderId: string) => {

    }, [])

    return {
        ...ordersState,
        handleSetOrderToEdit,
        handleResetOrders,
        handleFetchOrdersByUser,
        handleCreateOrder,
    }
}