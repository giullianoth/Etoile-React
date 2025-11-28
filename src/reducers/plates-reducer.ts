import { useCallback, useReducer } from "react";
import platesServices from "../services/plates-services";
import type { IPlatesActions, IPlatesState } from "../types/reducer-states";

const initialState: IPlatesState = {
    loading: false,
    success: false,
    errorMessage: null,
    successMessage: null,
    categories: [],
    plates: []
}

const platesReducerActions = (state: IPlatesState, action: IPlatesActions): IPlatesState => {
    switch (action.type) {
        case "CATEGORIES_FETCH_START":
            return {
                ...state,
                loading: true,
                success: false,
                successMessage: null,
                errorMessage: null
            }

        case "CATEGORIES_FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMessage: null,
                categories: action.payload
            }

        case "CATEGORIES_FETCH_FAILURE":
            return {
                ...state,
                loading: false,
                success: false,
                successMessage: null,
                errorMessage: action.payload
            }

            case "PLATES_FETCH_START":
            return {
                ...state,
                loading: true,
                success: false,
                successMessage: null,
                errorMessage: null
            }

        case "PLATES_FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMessage: null,
                plates: action.payload
            }

        case "PLATES_FETCH_FAILURE":
            return {
                ...state,
                loading: false,
                success: false,
                successMessage: null,
                errorMessage: action.payload
            }

        case "PLATES_CLEAR_DATA":
            return initialState

        default:
            return state
    }
}

export const usePlatesReducer = () => {
    const [platesState, dispatch] = useReducer<
        IPlatesState,
        [action: IPlatesActions]
    >(platesReducerActions, initialState)

    const handleClearPlatesData = useCallback(() => {
        dispatch({ type: "PLATES_CLEAR_DATA" })
    }, [])

    const handleFetchCategories = useCallback(async () => {
        dispatch({ type: "CATEGORIES_FETCH_START" })

        const response = await platesServices.fetchCategories()

        if (!response.success) {
            dispatch({
                type: "CATEGORIES_FETCH_FAILURE",
                payload: response.body.text ?? "Erro ao buscar categorias."
            })
            return
        }

        dispatch({
            type: "CATEGORIES_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleFetchAvailableCategories = useCallback(async () => {
        dispatch({ type: "CATEGORIES_FETCH_START" })

        const response = await platesServices.fetchAvailableCategories()

        if (!response.success) {
            dispatch({
                type: "CATEGORIES_FETCH_FAILURE",
                payload: response.body.text ?? "Erro ao buscar categorias."
            })
            return
        }

        dispatch({
            type: "CATEGORIES_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleFetchPlates = useCallback(async () => {
        dispatch({ type: "PLATES_FETCH_START" })

        const response = await platesServices.fetchPlates()

        if (!response.success) {
            dispatch({
                type: "PLATES_FETCH_FAILURE",
                payload: response.body.text ?? "Erro ao buscar pratos."
            })
            return
        }

        dispatch({
            type: "PLATES_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleFetchAvailablePlates = useCallback(async () => {
        dispatch({ type: "PLATES_FETCH_START" })

        const response = await platesServices.fetchAvailablePlates()

        if (!response.success) {
            dispatch({
                type: "PLATES_FETCH_FAILURE",
                payload: response.body.text ?? "Erro ao buscar pratos."
            })
            return
        }

        dispatch({
            type: "PLATES_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    return {
        ...platesState,
        handleClearPlatesData,
        handleFetchCategories,
        handleFetchAvailableCategories,
        handleFetchPlates,
        handleFetchAvailablePlates
    }
}