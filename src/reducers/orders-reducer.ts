import { useCallback, useReducer } from "react";
import type { IOrdersActions, IOrdersState } from "../types/reducer-states";
import ordersServices from "../services/orders-services";
import type { IOrder, IOrderCreate, IOrderUpdate } from "../types/order";
import type { IPlate } from "../types/plate";
import { useDateFormats } from "../hooks/date-formats";

const initialState: IOrdersState = {
    loading: false,
    success: false,
    errorMessage: null,
    successMessage: null,
    orders: [],
    currentOrder: null,
    orderFormFields: {
        userId: "",
        time: "",
        items: [],
        orderReceived: false
    }
}

const ordersReducerActions = (state: IOrdersState, action: IOrdersActions): IOrdersState => {
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
        case "ORDERS_CREATE_START":
        case "ORDERS_UPDATE_START":
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
                loading: false,
                success: true,
                errorMessage: null,
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
            const { orderResult, message } = action.payload

            const updatedOrders = state.orders.map(order => {
                if ("orderItems" in orderResult) {
                    return order._id === orderResult._id ? (orderResult as IOrder) : order
                }

                const isTargetOrder = order._id === orderResult.orderId

                if (isTargetOrder || !orderResult.orderId) {
                    return {
                        ...order,
                        orderItems: order.orderItems.filter(item => item._id !== orderResult._id)
                    }
                }

                return order
            })

            const updatedCurrentOrder = state.currentOrder
                ? {
                    ...state.currentOrder,
                    orderItems: state.currentOrder.orderItems.filter(item => item._id !== orderResult._id)
                }
                : null

            return {
                ...state,
                loading: false,
                success: true,
                errorMessage: null,
                successMessage: message,
                orders: updatedOrders,
                currentOrder: updatedCurrentOrder
            }

        case "ORDERS_FETCH_FAILURE":
        case "ORDERS_CREATE_FAILURE":
        case "ORDERS_UPDATE_FAILURE":
            return {
                ...state,
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
                orderFormFields: initialState.orderFormFields,
                currentOrder: null
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

        const response = await ordersServices.createOrder({
            ...ordersState.orderFormFields,
            userId: userId ? userId : ordersState.orderFormFields.userId,
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
    }, [ordersState.orderFormFields])

    const handleUpdateOrder = useCallback(async (orderDate: Date | null) => {
        dispatch({ type: "ORDERS_UPDATE_START" })

        if (!orderDate) {
            dispatch({
                type: "ORDERS_CREATE_FAILURE",
                payload: "Preencha o horário de comparecimento."
            })
            return
        }

        console.log(isPastDate(orderDate, ordersState.orderFormFields.time))
    }, [ordersState.orderFormFields])

    const handleCancelOrderItem = useCallback(async (orderItemId: string) => {
        dispatch({ type: "ORDERS_UPDATE_START" })

        if (!orderItemId) {
            dispatch({
                type: "ORDERS_UPDATE_FAILURE",
                payload: "Erro inesperado ao cancelar o item do pedido."
            })
            return
        }

        const response = await ordersServices.cancelOrderItem(orderItemId)

        if (!response.success) {
            dispatch({
                type: "ORDERS_UPDATE_FAILURE",
                payload: response.body.text ?? "Erro ao cancelar item do pedido."
            })
            return
        }

        dispatch({
            type: "ORDERS_UPDATE_SUCCESS",
            payload: {
                orderResult: response.body,
                message: "Item do pedido cancelado."
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
        handleCancelOrderItem
    }
}