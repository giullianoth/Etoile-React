import { useReducer, useState } from "react";
import type { IPlatesReducerState, IReducerAction } from "../interfaces/reducer-states";
import platesServices from "../services/plates";

const initialState: IPlatesReducerState = {
    success: false,
    loading: false,
    successMessage: null,
    errorMessage: null,
    plates: [],
    plate: null
}

const platesReducerActions = (state: IPlatesReducerState, action: IReducerAction) => {
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
                errorMessage: action.message ?? null
            }

        case "fulfilled":
            return {
                success: true,
                loading: false,
                successMessage: action.message ?? null,
                errorMessage: null,
                plates: action.payload.list ?? state.plates,
                plate: action.payload.data ?? state.plate
            }

        case "reset":
            return initialState

        default:
            return state
    }
}

export const usePlatesReducer = () => {
    const [platesState, dispatch] = useReducer<IPlatesReducerState, [action: IReducerAction]>(platesReducerActions, initialState)
    const [refetch, setRefetch] = useState<boolean>(true)

    const getAvailablePlates = async () => {
        dispatch({ status: "pending" })

        const res = await platesServices.getAvailablePlates()

        if (!res.success) {
            dispatch({
                status: "rejected",
                message: "Erro ao listar pratos."
            })

            setRefetch(false)
            return
        }

        dispatch({
            status: "fulfilled",
            payload: { list: res.body }
        })
    }

    return { platesState, refetch, getAvailablePlates }
}