import { useCallback, useReducer } from "react";
import type { IOrdersActions, IOrdersState } from "../types/reducer-states";
import ordersServices from "../services/orders-services";
import type { IOrder, IOrderCreate, IOrderItem, IOrderUpdate } from "../types/order";
import type { IPlate } from "../types/plate";
import { useDateFormats } from "../hooks/date-formats";

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
    orderFormFields: {
        userId: "",
        time: "",
        items: [],
        orderReceived: false
    }
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
                currentOrder: action.payload,
                orderFormFields: {
                    ...state.orderFormFields,
                    userId: action.payload ? action.payload.userDetails[0]._id : "",
                    time: action.payload ? action.payload.time : "",
                    items: action.payload ? action.payload.orderItems : []
                }
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

        case "ORDERS_CHANGE_FORM_FIELDS":
            return {
                ...state,
                errorMessage: null,
                orderFormFields: {
                    ...state.orderFormFields,
                    [action.payload.name]: action.payload.value
                }
            }

        case "ORDERS_CLEAR_FORM_FIELDS":
            return {
                ...state,
                errorMessage: null,
                successMessage: null,
                success: false,
                orderFormFields: initialState.orderFormFields
            }

        case "ORDERS_CLEAR_DATA":
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

    const { isPastDate } = useDateFormats()

    const handleChangeOrderFormFields = useCallback((name: keyof IOrderCreate | keyof IOrderUpdate, value: string | boolean | IPlate[]) => {
        dispatch({
            type: "ORDERS_CHANGE_FORM_FIELDS",
            payload: { name, value }
        })
    }, [])

    const handleClearOrdersData = useCallback(() => {
        dispatch({ type: "ORDERS_CLEAR_DATA" })
    }, [])

    const handleClearOrderFormFields = useCallback(() => {
        dispatch({ type: "ORDERS_CLEAR_FORM_FIELDS" })
    }, [])

    const handleSetOrderToEdit = useCallback((order: IOrder | null) => {
        dispatch({ type: "SET_ORDER_TO_EDIT", payload: order })
    }, [])

    const handleFetchOrders = useCallback(async () => {
        dispatch({ type: "ORDERS_FETCH_START" })

        const response = await ordersServices.fetchOrders()

        if (!response.success) {
            dispatch({
                type: "ORDERS_FETCH_FAILURE",
                payload: response.body.text ?? "Erro ao buscar pedidos."
            })
            return
        }

        dispatch({
            type: "ORDERS_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleFetchOrdersByUser = useCallback(async (userId: string) => {
        dispatch({ type: "ORDERS_FETCH_START" })

        const response = await ordersServices.fetchOrdersByUser(userId)

        if (!response.success) {
            dispatch({
                type: "ORDERS_FETCH_FAILURE",
                payload: response.body.text ?? "Erro ao buscar pedidos."
            })
            return
        }

        dispatch({
            type: "ORDERS_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleCreateOrder = useCallback(async (orderItems: IOrderCreate["items"], orderDate: Date | null, userId?: string) => {
        dispatch({ type: "ORDERS_CREATE_START" })

        if (!orderDate) {
            dispatch({
                type: "ORDERS_CREATE_FAILURE",
                payload: "Preencha o horário de comparecimento."
            })
            return
        }

        if (isPastDate(orderDate)) {
            dispatch({
                type: "ORDERS_CREATE_FAILURE",
                payload: "Hora inválida."
            })
            return
        }

        const orderData = ordersState.orderFormFields
        delete(orderData.orderReceived)

        const response = await ordersServices.createOrder({
            ...orderData,
            userId: userId ? userId : orderData.userId,
            items: orderItems,
            time: orderDate
        })

        if (!response.success) {
            dispatch({
                type: "ORDERS_CREATE_FAILURE",
                payload: response.body.text ?? "Erro ao cadastrar pedido."
            })
            return
        }

        dispatch({
            type: "ORDERS_CREATE_SUCCESS",
            payload: {
                order: response.body,
                message: "Pedido criado com sucesso."
            }
        })
    }, [ordersState.orderFormFields, isPastDate])

    const handleUpdateOrder = useCallback(async (orderDate: Date | null) => {
        dispatch({ type: "ORDERS_UPDATE_START" })

        if (!ordersState.currentOrder) {
            dispatch({
                type: "ORDERS_UPDATE_FAILURE",
                payload: "Erro inesperado ao atualizar pedido."
            })
            return
        }

        if (!orderDate) {
            dispatch({
                type: "ORDERS_UPDATE_FAILURE",
                payload: "Preencha o horário de comparecimento."
            })
            return
        }

        if (isPastDate(orderDate, ordersState.currentOrder.time)) {
            dispatch({
                type: "ORDERS_UPDATE_FAILURE",
                payload: "O horário precisa ser posterior."
            })
            return
        }

        const orderData = ordersState.orderFormFields
        delete(orderData.userId)
        delete(orderData.items)

        const { orderReceived, ...orderDataRest } = orderData
        orderDataRest.time = orderDate
        orderDataRest.status = orderReceived ? "Concluído" : ordersState.currentOrder.status

        const response = await ordersServices.updateOrder(
            orderDataRest,
            ordersState.currentOrder._id
        )

        if (!response.success) {
            dispatch({
                type: "ORDERS_UPDATE_FAILURE",
                payload: response.body.text ?? "Erro ao atualizar pedido."
            })
            return
        }

        dispatch({
            type: "ORDERS_UPDATE_SUCCESS",
            payload: {
                orderResult: response.body as IOrder,
                message: "Pedido atualizado com sucesso."
            }
        })
    }, [ordersState.orderFormFields, isPastDate, ordersState.currentOrder])

    const handleCancelOrderItem = useCallback(async (orderItemId: string) => {
        dispatch({ type: "ORDERS_CANCEL_ITEM_START" })

        if (!orderItemId) {
            dispatch({
                type: "ORDERS_CANCEL_ITEM_FAILURE",
                payload: "Erro inesperado ao cancelar o item do pedido."
            })
            return
        }

        const response = await ordersServices.cancelOrderItem(orderItemId)

        if (!response.success) {
            dispatch({
                type: "ORDERS_CANCEL_ITEM_FAILURE",
                payload: response.body.text ?? "Erro ao cancelar item do pedido."
            })
            return
        }

        dispatch({
            type: "ORDERS_CANCEL_ITEM_SUCCESS",
            payload: {
                orderResult: response.body as IOrderItem,
                message: "Item do pedido cancelado."
            }
        })
    }, [])

    const handleCancelOrder = useCallback(async (orderId: string) => {
        dispatch({ type: "ORDERS_UPDATE_START" })

        if (!orderId) {
            dispatch({
                type: "ORDERS_UPDATE_FAILURE",
                payload: "Erro inesperado ao cancelar pedido."
            })
            return
        }

        const response = await ordersServices.cancelOrder(orderId)

        if (!response.success) {
            dispatch({
                type: "ORDERS_UPDATE_FAILURE",
                payload: response.body.text ?? "Erro ao cancelar pedido."
            })
            return
        }

        dispatch({
            type: "ORDERS_UPDATE_SUCCESS",
            payload: {
                orderResult: response.body as IOrder,
                message: "Pedido cancelado com sucesso."
            }
        })
    }, [])

    const handleDeleteOrder = useCallback(async (orderId: string) => {
        dispatch({ type: "ORDERS_DELETE_START" })

        if (!orderId) {
            dispatch({
                type: "ORDERS_DELETE_FAILURE",
                payload: "Erro inesperado ao excluir pedido."
            })
            return
        }

        const response = await ordersServices.deleteOrder(orderId)

        if (!response.success) {
            dispatch({
                type: "ORDERS_DELETE_FAILURE",
                payload: response.body.text ?? "Erro ao cancelar pedido."
            })
            return
        }

        dispatch({
            type: "ORDERS_DELETE_SUCCESS",
            payload: {
                orderId: response.body.orderToDelete._id,
                message: "Pedido excluído com sucesso."
            }
        })
    }, [])

    return {
        ...ordersState,
        handleSetOrderToEdit,
        handleChangeOrderFormFields,
        handleClearOrdersData,
        handleClearOrderFormFields,
        handleFetchOrders,
        handleFetchOrdersByUser,
        handleCreateOrder,
        handleUpdateOrder,
        handleCancelOrderItem,
        handleCancelOrder,
        handleDeleteOrder
    }
}