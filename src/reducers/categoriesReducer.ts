import { useEffect, useReducer, useState } from "react";
import type { ICategory } from "../interfaces/category";
import type { ICategoryState, IReducerAction } from "../interfaces/reducer-state";
import categoriesService from "../services/categories-service";
import platesServices from "../services/plates-service";
import type { IPlate } from "../interfaces/plate";

const categoryState: ICategoryState = {
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

        default:
            return state
    }
}

export const categoriesReducer = () => {
    const [categoriesState, dispatch] = useReducer<ICategoryState, [action: IReducerAction]>(categoriesReducerActions, categoryState)
    const [cancelled, setCancelled] = useState<boolean>(false)

    useEffect(() => {
        setCancelled(true)
    }, [categoriesState])

    const getCategories = async () => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await categoriesService.getCategories()

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar categorias." })
            return
        }

        dispatch({
            status: "fulfilled",
            payload: { data: res.body }
        })
    }

    const getAvailableCategories = async () => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const categories = await categoriesService.getCategories()
        const plates = await platesServices.getAvailablePlates()

        if (!categories.success || !plates.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar categorias." })
            return
        }

        const res = categories.body.filter((category: ICategory) => plates.body.some((plate: IPlate) => plate.categoryId === category._id))

        dispatch({
            status: "fulfilled",
            payload: { data: res.body }
        })
    }

    const addCategory = async (categoryData: Partial<ICategory>) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await categoriesService.addCategory(categoryData)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao adicionar categoria." })
            return
        }

        await getCategories()

        dispatch({
            status: "fulfilled",
            payload: { message: "Categoria registrada com sucesso." }
        })
    }

    const updateCategory = async (categoryId: string, categoryData: Partial<ICategory>) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await categoriesService.updateCategory(categoryId, categoryData)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao atualizar categoria." })
            return
        }

        await getCategories()

        dispatch({
            status: "fulfilled",
            payload: { message: "Categoria registrada com sucesso." }
        })
    }

    const deleteCategory = async (categoryId: string) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const plates = await platesServices.getPlates()
        const platesInCategory = plates.body.filter((plate: IPlate) => plate.categoryId === categoryId)

        if (platesInCategory && platesInCategory.length) {
            dispatch({ status: "rejected", payload: "Não é possível excluir uma categoria que tenha pratos cadastrados." })
            return
        }

        const res = await categoriesService.deleteCategory(categoryId)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao excluir categoria." })
            return
        }

        await getCategories()

        dispatch({
            status: "fulfilled",
            payload: { message: "Categoria excluída com sucesso." }
        })
    }

    return { categoriesState, getCategories, getAvailableCategories, addCategory, updateCategory, deleteCategory }
}