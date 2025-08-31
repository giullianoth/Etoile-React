import { useEffect, useReducer, useState } from "react";
import type { IPlateState, IReducerAction } from "../interfaces/reducer-state";
import platesServices from "../services/plates-service";
import type { IPlate } from "../interfaces/plate";

const plateState: IPlateState = {
    success: false,
    loading: false,
    errorMessage: null,
    successMessage: null,
    plates: [],
    plate: null
}

const platesReducerActions = (state: IPlateState, action: IReducerAction) => {
    switch (action.status) {
        case "pending":
            return {
                ...state,
                success: false,
                loading: true
            }

        case "fulfilled":
            return {
                ...state,
                success: true,
                loading: false,
                plates: action.payload
            }

        case "rejected":
            return {
                ...state,
                success: false,
                loading: false,
                errorMessage: action.payload
            }

        default:
            return state
    }
}

export const platesReducer = () => {
    const [platesState, dispatch] = useReducer<IPlateState, [action: IReducerAction]>(platesReducerActions, plateState)
    const [cancelled, setCancelled] = useState<boolean>(false)

    useEffect(() => {
        setCancelled(true)
    }, [platesState])

    const getPlates = async () => {
        if (cancelled) {
            return
        }

        dispatch({ status: "pending" })

        const res = await platesServices.getPlates()

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar pratos." })
            return
        }

        dispatch({ status: "fulfilled", payload: res.body })
    }

    const getAvailablePlates = async () => {
        if (cancelled) {
            return
        }

        dispatch({ status: "pending" })

        const res = await platesServices.getAvailablePlates()

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar pratos." })
            return
        }

        dispatch({ status: "fulfilled", payload: res.body })
    }

    const addPlate = async (plateData: Partial<IPlate>) => {

    }

    const updatePlate = async (plateId: string, plateData: Partial<IPlate>) => {

    }

    const deletePlate = async (plateId: string) => {

    }

    return { platesState, getPlates, getAvailablePlates, addPlate, updatePlate, deletePlate }
}