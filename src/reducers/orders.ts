import { useCallback, useReducer } from "react"
import type { IOrdersReducer, IOrdersReducerActions, IOrdersReducerState } from "../types/reducer-states"
import type { IOrder, IOrderCreate, IOrderItem, IOrderUpdate } from "../types/order"
import { useDateFormats } from "../hooks/date-formats"
import ordersServices from "../services/orders"

const initialState: IOrdersReducerState = {
    fetching: false,
    fetchSuccess: false,
    fetchErrorMessage: null,
    mutating: false,
    mutateSuccess: false,
    mutateSuccessMessage: null,
    mutateErrorMessage: null,
    cancellingOrderItem: false,
    deleting: false,
    deleteSuccess: false,
    deleteSuccessMessage: null,
    deleteErrorMessage: null,
    verifyingPastOrder: false,
    pastOrderVerified: false,
    pastOrderMessage: null,
    cancelledOrderIds: [],
    orders: [],
    currentOrder: null,
}

const ordersReducerActions = (state: IOrdersReducerState, action: IOrdersReducerActions): IOrdersReducerState => {
    let updatedOrders: IOrder[]
    let updatedCurrentOrder: IOrder | null

    switch (action.type) {
        case "ORDERS_FETCH_START":
            return {
                ...state,
                fetching: true,
                fetchSuccess: false,
                fetchErrorMessage: null,
            }

        case "ORDERS_FETCH_SUCCESS":
            return {
                ...state,
                fetching: false,
                fetchSuccess: true,
                fetchErrorMessage: null,
                orders: action.payload,
            }

        case "ORDERS_FETCH_FAILURE":
            return {
                ...state,
                fetching: false,
                fetchSuccess: false,
                fetchErrorMessage: action.payload,
            }

        case "ORDERS_MUTATE_START":
            return {
                ...state,
                mutating: true,
                mutateSuccessMessage: null,
                mutateErrorMessage: null
            }

        case "ORDERS_MUTATE_SUCCESS":
            updatedOrders = state.orders.some(order => order._id === action.payload.order._id)
                ? state.orders.map(order => {
                    if (order._id === action.payload.order._id) {
                        return {
                            ...order,
                            ...action.payload.order
                        }
                    }

                    return order
                })
                : [...state.orders, action.payload.order]

            return {
                ...state,
                mutating: false,
                mutateSuccess: true,
                mutateSuccessMessage: action.payload.message,
                mutateErrorMessage: null,
                orders: updatedOrders
            }

        case "ORDERS_MUTATE_FAILURE":
            return {
                ...state,
                mutating: false,
                mutateSuccess: false,
                mutateSuccessMessage: null,
                mutateErrorMessage: action.payload
            }

        case "ORDERS_CANCEL_ITEM_START":
            return {
                ...state,
                cancellingOrderItem: true,
                mutateSuccessMessage: null,
                mutateErrorMessage: null
            }

        case "ORDERS_CANCEL_ITEM_SUCCESS":
            updatedOrders = state.orders.map(order => {
                const isTargetOrder = order._id === action.payload.orderId

                if (isTargetOrder || !action.payload.orderId) {
                    return {
                        ...order,
                        orderItems: order.orderItems.filter(item => item._id !== action.payload._id)
                    }
                }

                return order
            })

            updatedCurrentOrder = state.currentOrder
                ? {
                    ...state.currentOrder,
                    orderItems: state.currentOrder.orderItems.filter(item =>
                        item._id !== action.payload._id)
                }
                : null

            return {
                ...state,
                cancellingOrderItem: false,
                mutateSuccess: true,
                mutateErrorMessage: null,
                orders: updatedOrders,
                currentOrder: updatedCurrentOrder,
            }

        case "ORDERS_CANCEL_ITEM_FAILURE":
            return {
                ...state,
                cancellingOrderItem: false,
                mutateSuccess: false,
                mutateSuccessMessage: null,
                mutateErrorMessage: action.payload
            }

        case "ORDERS_DELETE_START":
            return {
                ...state,
                deleting: true,
                deleteSuccess: false,
                deleteSuccessMessage: null,
                deleteErrorMessage: null,
            }

        case "ORDERS_DELETE_SUCCESS":
            updatedOrders = state.orders.filter(order => order._id !== action.payload.orderId)

            return {
                ...state,
                deleting: false,
                deleteSuccess: true,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: null,
                orders: updatedOrders,
            }

        case "ORDERS_DELETE_FAILURE":
            return {
                ...state,
                deleting: false,
                deleteSuccess: false,
                deleteSuccessMessage: null,
                deleteErrorMessage: action.payload,
            }

        case "ORDERS_VERIFY_PAST_ORDER_START":
            return {
                ...state,
                verifyingPastOrder: true,
                pastOrderVerified: false,
            }

        case "ORDERS_VERIFY_PAST_ORDER_SUCCESS":
            updatedOrders = state.orders.map(order => {
                if (action.payload.order._id === order._id) {
                    return {
                        ...order,
                        ...action.payload.order
                    }
                }

                return order
            })

            return {
                ...state,
                verifyingPastOrder: false,
                pastOrderVerified: true,
                pastOrderMessage: action.payload.message,
                cancelledOrderIds: [...state.cancelledOrderIds, action.payload.order._id],
                orders: updatedOrders,
            }

        case "ORDERS_VERIFY_PAST_ORDER_ABORT":
            return {
                ...state,
                verifyingPastOrder: false,
                pastOrderVerified: false,
            }

        case "SET_ORDER_TO_EDIT":
            return {
                ...state,
                currentOrder: action.payload,
            }

        case "ORDERS_RESET_MESSAGES":
            return {
                ...state,
                fetchErrorMessage: null,
                mutateSuccessMessage: null,
                mutateErrorMessage: null,
                deleteSuccessMessage: null,
                deleteErrorMessage: null,
            }

        default:
            return state
    }
}

export const useOrdersReducer = (): IOrdersReducer => {
    const [ordersState, dispatch] = useReducer<
        IOrdersReducerState,
        [action: IOrdersReducerActions]
    >(ordersReducerActions, initialState)

    const { isPastDate } = useDateFormats()

    const handleResetOrdersMessage = useCallback(() => {
        dispatch({ type: "ORDERS_RESET_MESSAGES" })
    }, [])

    const handleSetOrderToEdit = useCallback((order: IOrder | null) => {
        dispatch({ type: "SET_ORDER_TO_EDIT", payload: order })
    }, [])

    const handleFetchOrders = useCallback(async () => {
        dispatch({ type: "ORDERS_FETCH_START" })

        const response = await ordersServices.fetchOrders()

        if (!response.success) {
            return dispatch({
                type: "ORDERS_FETCH_FAILURE",
                payload: response.body.text || "Erro ao buscar pedidos."
            })
        }

        return dispatch({
            type: "ORDERS_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleFetchOrdersByUser = useCallback(async (userId: string) => {
        dispatch({ type: "ORDERS_FETCH_START" })

        if (!userId) {
            return dispatch({
                type: "ORDERS_FETCH_FAILURE",
                payload: "Erro inesperado ao buscar pedidos."
            })
        }

        const response = await ordersServices.fetchOrdersByUser(userId)

        if (!response.success) {
            return dispatch({
                type: "ORDERS_FETCH_FAILURE",
                payload: response.body.text || "Erro ao buscar pedidos."
            })
        }

        return dispatch({
            type: "ORDERS_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleCreateOrder = useCallback(async (orderData: Partial<IOrderCreate>) => {
        dispatch({ type: "ORDERS_MUTATE_START" })

        if (!orderData.items || !orderData.items.length) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: "Selecione pelo menos um prato."
            })
        }

        if (!orderData.userId) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: "Selecione o cliente."
            })
        }

        if (!orderData.time) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: "Preencha corretamente o horário."
            })
        }

        if (isPastDate(orderData.time)) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: "Data / horário inválido."
            })
        }

        const response = await ordersServices.createOrder(orderData)

        if (!response.success) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao registrar pedido."
            })
        }

        return dispatch({
            type: "ORDERS_MUTATE_SUCCESS",
            payload: {
                order: response.body as IOrder,
                message: "Pedido registrado com sucesso."
            }
        })
    }, [isPastDate])

    const handleUpdateOrder = useCallback(async (
        orderData: Partial<IOrderUpdate>,
        orderId: string,
        isAdmin: boolean = false
    ) => {
        dispatch({ type: "ORDERS_MUTATE_START" })

        if (!ordersState.currentOrder) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: "Erro inesperado ao atualizar pedido."
            })
        }

        if (!orderData.items || !orderData.items.length) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: "Selecione pelo menos um prato."
            })
        }

        if (!orderData.userId) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: "Selecione o cliente."
            })
        }

        if (!orderData.time) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: "Preencha corretamente o horário."
            })
        }

        if (!isAdmin) {
            if (isPastDate(orderData.time)) {
                return dispatch({
                    type: "ORDERS_MUTATE_FAILURE",
                    payload: "Data / horário inválido."
                })
            }

            if (isPastDate(orderData.time, ordersState.currentOrder.time)) {
                return dispatch({
                    type: "ORDERS_MUTATE_FAILURE",
                    payload: "Não é possível selecionar horário anterior ao já selecionado."
                })
            }

            if (orderData.orderReceived) {
                orderData.status = "Concluído"
            }

            delete orderData.orderReceived
        }

        const response = await ordersServices.updateOrder(orderData, orderId)

        if (!response.success) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao atualizar pedido."
            })
        }

        return dispatch({
            type: "ORDERS_MUTATE_SUCCESS",
            payload: {
                order: response.body as IOrder,
                message: "Pedido atualizado com sucesso."
            }
        })
    }, [isPastDate, ordersState.currentOrder])

    const handleConcludeOrder = useCallback(async (orderId: string) => {
        dispatch({ type: "ORDERS_MUTATE_START" })

        if (!orderId) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: "Erro inesperado ao concluir pedido."
            })
        }

        const response = await ordersServices.concludeOrder(orderId)

        if (!response.success) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao concluir pedido."
            })
        }

        return dispatch({
            type: "ORDERS_MUTATE_SUCCESS",
            payload: {
                order: response.body as IOrder,
                message: "Pedido concluído com sucesso."
            }
        })
    }, [])

    const handleCancelOrder = useCallback(async (orderId: string) => {
        dispatch({ type: "ORDERS_MUTATE_START" })

        if (!orderId) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: "Erro inesperado ao cancelar pedido."
            })
        }

        const response = await ordersServices.cancelOrder(orderId)

        if (!response.success) {
            return dispatch({
                type: "ORDERS_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao cancelar pedido."
            })
        }

        return dispatch({
            type: "ORDERS_MUTATE_SUCCESS",
            payload: {
                order: response.body as IOrder,
                message: "Pedido cancelado com sucesso."
            }
        })
    }, [])

    const handleCancelOrderItem = useCallback(async (orderItemId: string) => {
        dispatch({ type: "ORDERS_CANCEL_ITEM_START" })

        if (!orderItemId) {
            return dispatch({
                type: "ORDERS_CANCEL_ITEM_FAILURE",
                payload: "Erro inesperado ao cancelar item do pedido."
            })
        }

        const response = await ordersServices.cancelOrderItem(orderItemId)

        if (!response.success) {
            return dispatch({
                type: "ORDERS_CANCEL_ITEM_FAILURE",
                payload: response.body.text || "Erro ao cancelar item do pedido."
            })
        }

        return dispatch({
            type: "ORDERS_CANCEL_ITEM_SUCCESS",
            payload: response.body as IOrderItem
        })
    }, [])

    const handleDeleteOrder = useCallback(async (orderId: string) => {
        dispatch({ type: "ORDERS_DELETE_START" })

        if (!orderId) {
            return dispatch({
                type: "ORDERS_DELETE_FAILURE",
                payload: "Erro inesperado ao excluir pedido."
            })
        }

        const response = await ordersServices.deleteOrder(orderId)

        if (!response.success) {
            return dispatch({
                type: "ORDERS_DELETE_FAILURE",
                payload: response.body.text || "Erro ao excluir pedido"
            })
        }

        return dispatch({
            type: "ORDERS_DELETE_SUCCESS",
            payload: {
                orderId: response.body.orderToDelete._id,
                message: "Pedido excluído com sucesso."
            }
        })
    }, [])

    const handleVerifyPastOrder = useCallback(async (order: IOrder) => {
        dispatch({ type: "ORDERS_VERIFY_PAST_ORDER_START" })

        if (!order) {
            return dispatch({ type: "ORDERS_VERIFY_PAST_ORDER_ABORT" })
        }

        if (order.status !== "Pendente") {
            return dispatch({ type: "ORDERS_VERIFY_PAST_ORDER_ABORT" })
        }

        if (!isPastDate(order.time)) {
            return dispatch({ type: "ORDERS_VERIFY_PAST_ORDER_ABORT" })
        }

        const response = await ordersServices.cancelOrder(order._id)

        if (!response.success) {
            return dispatch({ type: "ORDERS_VERIFY_PAST_ORDER_ABORT" })
        }

        return dispatch({
            type: "ORDERS_VERIFY_PAST_ORDER_SUCCESS",
            payload: {
                order: response.body as IOrder,
                message: "O pedido ultrapassou o prazo e foi cancelado."
            }
        })
    }, [isPastDate])

    return {
        ...ordersState,
        handleSetOrderToEdit,
        handleResetOrdersMessage,
        handleFetchOrders,
        handleFetchOrdersByUser,
        handleCreateOrder,
        handleUpdateOrder,
        handleConcludeOrder,
        handleCancelOrder,
        handleCancelOrderItem,
        handleDeleteOrder,
        handleVerifyPastOrder,
    }
}