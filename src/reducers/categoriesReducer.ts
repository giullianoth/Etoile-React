import { useReducer, useState } from "react";
import type { ICategoriesReducerState, IReducerAction } from "../interfaces/reducer-states";
import categoriesServices from "../services/categories";

const initialState: ICategoriesReducerState = {
    success: false,
    loading: false,
    successMessage: null,
    errorMessage: null,
    categories: [],
    category: null
}

const categoresReducerActions = (state: ICategoriesReducerState, action: IReducerAction) => {
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
                categories: action.payload.list ?? state.categories,
                category: action.payload.data ?? state.category
            }

        case "reset":
            return initialState

        default:
            return state
    }
}

export const useCategoriesReducer = () => {
    const [categoriesState, dispatch] = useReducer<ICategoriesReducerState, [action: IReducerAction]>(categoresReducerActions, initialState)
    const [refetch, setRefetch] = useState<boolean>(true)

    const getAvailableCategories = async () => {
        dispatch({ status: "pending" })

        const res = await categoriesServices.getAvailableCategories()

        if (!res.success) {
            dispatch({
                status: "rejected",
                message: "Erro ao listar categorias."
            })

            setRefetch(false)
            return
        }

        dispatch({
            status: "fulfilled",
            payload: { list: res.body }
        })
    }

    return { categoriesState, refetch, getAvailableCategories }
}