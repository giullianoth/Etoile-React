import { useCallback, useReducer } from "react";
import type { IOrdersActions, IOrdersState } from "../types/reducer-states";
import ordersServices from "../services/orders-services";
import type { IOrderCreate } from "../types/order";
import type { IPlate } from "../types/plate";
import { useDateFormats } from "../hooks/date-formats";

const initialState: IOrdersState = {
    loading: false,
    success: false,
    errorMessage: null,
    successMessage: null,
    orders: [],
    orderFormFields: {
        userId: "",
        time: "",
        items: []
    }
}

const ordersReducerActions = (state: IOrdersState, action: IOrdersActions): IOrdersState => {
    switch (action.type) {
        case "ORDERS_FETCH_START":
        case "ORDERS_CREATE_START":
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

        case "ORDERS_FETCH_FAILURE":
        case "ORDERS_CREATE_FAILURE":
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

    const handleChangeOrderFormFields = useCallback((name: keyof IOrderCreate, value: string | IPlate[]) => {
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

    return {
        ...ordersState,
        handleChangeOrderFormFields,
        handleClearOrdersData,
        handleClearOrderFormFields,
        handleFetchOrders,
        handleFetchOrdersByUser,
        handleCreateOrder
    }
}