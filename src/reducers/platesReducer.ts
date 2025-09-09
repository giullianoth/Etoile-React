import { useEffect, useReducer, useState } from "react";
import type { IPlateState, IReducerAction } from "../interfaces/reducer-state";
import platesServices from "../services/plates-service";
import type { IPlateRegister } from "../interfaces/plate";

const initialState: IPlateState = {
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
                success: true,
                loading: false,
                plates: action.payload.data ?? state.plates,
                plate: action.payload.single ?? state.plate,
                successMessage: action.payload.message,
                errorMessage: null
            }

        case "rejected":
            return {
                success: false,
                loading: false,
                errorMessage: action.payload,
                successMessage: null,
                plates: [],
                plate: null
            }

        case "reset":
            return initialState

        default:
            return state
    }
}

export const platesReducer = () => {
    const [platesState, dispatch] = useReducer<IPlateState, [action: IReducerAction]>(platesReducerActions, initialState)
    const [cancelled, setCancelled] = useState<boolean>(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const resetState = () => dispatch({ status: "reset" })

    const getPlates = async () => {
        checkIfIsCancelled()

        dispatch({ status: "pending" })

        const res = await platesServices.getPlates()

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao carregar pratos."
            })

            return
        }

        dispatch({
            status: "fulfilled",
            payload: { data: res.body, }
        })
    }

    const getAvailablePlates = async () => {
        checkIfIsCancelled()

        dispatch({ status: "pending" })

        const res = await platesServices.getAvailablePlates()

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao carregar pratos."
            })

            return
        }

        dispatch({
            status: "fulfilled",
            payload: { data: res.body, }
        })
    }

    const addPlate = async (plateData: Partial<IPlateRegister>) => {
        checkIfIsCancelled()

        dispatch({ status: "pending" })

        if (!plateData.name) {
            dispatch({ status: "rejected", payload: "Digite o nome do prato." })
            return
        }

        if (!plateData.category) {
            dispatch({ status: "rejected", payload: "Selecione a categoria do prato." })
            return
        }

        if (!plateData.price) {
            dispatch({ status: "rejected", payload: "Digite o preço do prato." })
            return
        }

        if (!plateData.ingredientsString) {
            dispatch({ status: "rejected", payload: "Digite os ingredientes." })
            return
        }

        plateData.categoryId = plateData.category._id
        plateData.price = parseFloat((plateData.price as string).replace(",", "."))

        plateData.ingredients = plateData.ingredientsString.split(",")
            .map(ingredient => ingredient.trim())

        const { category, ingredientsString, ...plateDataRest } = plateData

        const res = await platesServices.addPlate(plateDataRest)

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao adicionar prato."
            })

            return
        }

        await getPlates()

        dispatch({
            status: "fulfilled",
            payload: { message: "Prato adicionado com sucesso." }
        })
    }

    const updatePlate = async (plateId: string, plateData: Partial<IPlateRegister>) => {
        checkIfIsCancelled()

        dispatch({ status: "pending" })

        if (!plateData.name) {
            dispatch({ status: "rejected", payload: "Digite o nome do prato." })
            return
        }

        if (!plateData.category) {
            dispatch({ status: "rejected", payload: "Selecione a categoria do prato." })
            return
        }

        if (!plateData.price) {
            dispatch({ status: "rejected", payload: "Digite o preço do prato." })
            return
        }

        if (!plateData.ingredientsString) {
            dispatch({ status: "rejected", payload: "Digite os ingredientes." })
            return
        }

        plateData.categoryId = plateData.category._id
        plateData.price = parseFloat((plateData.price as string).replace(",", "."))

        plateData.ingredients = plateData.ingredientsString.split(",")
            .map(ingredient => ingredient.trim())

        const { category, ingredientsString, ...plateDataRest } = plateData

        const res = await platesServices.updatePlate(plateId, plateDataRest)

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao atualizar prato."
            })

            return
        }

        await getPlates()

        dispatch({
            status: "fulfilled",
            payload: { message: "Prato atualizado com sucesso." }
        })
    }

    const deletePlate = async (plateId: string) => {
        checkIfIsCancelled()

        dispatch({ status: "pending" })

        const res = await platesServices.deletePlate(plateId)

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao excluir prato."
            })

            return
        }

        await getPlates()

        dispatch({
            status: "fulfilled",
            payload: { message: "Prato excluído com sucesso." }
        })
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { platesState, resetState, getPlates, getAvailablePlates, addPlate, updatePlate, deletePlate }
}