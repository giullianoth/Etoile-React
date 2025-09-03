import { useReducer, useState } from "react";
import type { ICategory } from "../interfaces/category";
import type { ICategoryState, IReducerAction } from "../interfaces/reducer-state";
import categoriesService from "../services/categories-service";
import platesServices from "../services/plates-service";
import type { IPlate } from "../interfaces/plate";

const state: ICategoryState = {
    success: false,
    loading: false,
    errorMessage: null,
    successMessage: null,
    categories: [],
    category: null
}

const categoriesReducerActions = (state: ICategoryState, action: IReducerAction) => {
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
                categories: action.payload.data ?? state.categories,
                category: action.payload.single ?? state.category,
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
                categories: [],
                category: null
            }

        case "reset":
            return {
                success: false,
                loading: false,
                errorMessage: null,
                successMessage: null,
                categories: [],
                category: null
            }

        default:
            return state
    }
}

export const categoriesReducer = () => {
    const [categoriesState, dispatch] = useReducer<ICategoryState, [action: IReducerAction]>(categoriesReducerActions, state)
    const [cancelled, setCancelled] = useState<boolean>(false)

    const resetState = () => {
        dispatch({ status: "reset" })
    }

    const getCategories = async () => {
        dispatch({ status: "pending" })

        const res = await categoriesService.getCategories()

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar categorias." })
            setCancelled(true)
            return
        }

        dispatch({
            status: "fulfilled",
            payload: { data: res.body }
        })

        setCancelled(true)
    }

    const getAvailableCategories = async () => {
        dispatch({ status: "pending" })

        const categories = await categoriesService.getCategories()
        const plates = await platesServices.getAvailablePlates()

        if (!categories.success || !plates.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar categorias." })
            setCancelled(true)
            return
        }

        const res = categories.body.filter((category: ICategory) => plates.body.some((plate: IPlate) => plate.categoryId === category._id))

        dispatch({
            status: "fulfilled",
            payload: { data: res }
        })

        setCancelled(true)
    }

    const addCategory = async (categoryData: Partial<ICategory>) => {
        dispatch({ status: "pending" })

        if (!categoryData.name) {
            dispatch({ status: "rejected", payload: "Digite a categoria." })
            setCancelled(true)
            return
        }

        const res = await categoriesService.addCategory(categoryData)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao adicionar categoria." })
            setCancelled(true)
            return
        }

        await getCategories()

        dispatch({
            status: "fulfilled",
            payload: { message: "Categoria registrada com sucesso." }
        })

        setCancelled(true)
    }

    const updateCategory = async (categoryId: string, categoryData: Partial<ICategory>) => {
        dispatch({ status: "pending" })

        if (!categoryData.name) {
            dispatch({ status: "rejected", payload: "Digite a categoria." })
            setCancelled(true)
            return
        }

        const res = await categoriesService.updateCategory(categoryId, categoryData)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao atualizar categoria." })
            setCancelled(true)
            return
        }

        await getCategories()

        dispatch({
            status: "fulfilled",
            payload: { message: "Categoria registrada com sucesso." }
        })

        setCancelled(true)
    }

    const deleteCategory = async (categoryId: string) => {
        dispatch({ status: "pending" })

        const plates = await platesServices.getPlates()
        const platesInCategory = plates.body.filter((plate: IPlate) => plate.categoryId === categoryId)

        if (platesInCategory && platesInCategory.length) {
            dispatch({ status: "rejected", payload: "Não é possível excluir uma categoria que tenha pratos cadastrados." })
            setCancelled(true)
            return
        }

        const res = await categoriesService.deleteCategory(categoryId)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao excluir categoria." })
            setCancelled(true)
            return
        }

        await getCategories()

        dispatch({
            status: "fulfilled",
            payload: { message: "Categoria excluída com sucesso." }
        })

        setCancelled(true)
    }

    return { categoriesState, cancelled, resetState, getCategories, getAvailableCategories, addCategory, updateCategory, deleteCategory }
}