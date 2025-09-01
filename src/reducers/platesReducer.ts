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
                plates: action.payload.data ?? state.plates,
                plate: action.payload.single ?? state.plate,
                successMessage: action.payload.message,
                errorMessage: null
            }

        case "rejected":
            return {
                ...state,
                success: false,
                loading: false,
                errorMessage: action.payload,
                successMessage: null,
                plates: [],
                plate: null
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
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await platesServices.getPlates()

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar pratos." })
            return
        }

        dispatch({
            status: "fulfilled",
            payload: { data: res.body, }
        })
    }

    const getAvailablePlates = async () => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await platesServices.getAvailablePlates()

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar pratos." })
            return
        }

        dispatch({
            status: "fulfilled",
            payload: { data: res.body, }
        })
    }

    const addPlate = async (plateData: Partial<IPlate>) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await platesServices.addPlate(plateData)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao adicionar prato." })
            return
        }

        await getPlates()

        dispatch({
            status: "fulfilled",
            payload: { message: "Prato adicionado com sucesso." }
        })
    }

    const updatePlate = async (plateId: string, plateData: Partial<IPlate>) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await platesServices.updatePlate(plateId, plateData)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao atualizar prato." })
            return
        }

        await getPlates()

        dispatch({
            status: "fulfilled",
            payload: { message: "Prato atualizado com sucesso." }
        })
    }

    const deletePlate = async (plateId: string) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await platesServices.deletePlate(plateId)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao excluir prato." })
            return
        }

        await getPlates()

        dispatch({
            status: "fulfilled",
            payload: { message: "Prato excluído com sucesso." }
        })
    }

    return { platesState, getPlates, getAvailablePlates, addPlate, updatePlate, deletePlate }
}