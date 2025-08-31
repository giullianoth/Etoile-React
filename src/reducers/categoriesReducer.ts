import { useEffect, useReducer, useState } from "react";
import type { ICategory } from "../interfaces/category";
import type { ICategoryState, IReducerAction } from "../interfaces/reducer-state";
import categoriesServices from "../services/categories-service";
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
                categories: action.payload
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

export const categoriesReducer = () => {
    const [categoriesState, dispatch] = useReducer<ICategoryState, [action: IReducerAction]>(categoriesReducerActions, categoryState)
    const [cancelled, setCancelled] = useState<boolean>(false)

    useEffect(() => {
        setCancelled(true)
    }, [categoriesState])

    const getCategories = async () => {
        if (cancelled) {
            return
        }

        dispatch({ status: "pending" })

        const res = await categoriesServices.getCategories()

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar categorias." })
            return
        }

        dispatch({ status: "fulfilled", payload: res.body })
    }

    const getAvailableCategories = async () => {
        if (cancelled) {
            return
        }

        dispatch({ status: "pending" })

        const categories = await categoriesServices.getCategories()
        const plates = await platesServices.getAvailablePlates()

        if (!categories.success || !plates.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar categorias." })
            return
        }

        const res = categories.body.filter((category: ICategory) => plates.body.some((plate: IPlate) => plate.categoryId === category._id))

        dispatch({ status: "fulfilled", payload: res })
    }

    const addCategory = async (categoryData: Partial<ICategory>) => { }

    const updateCategory = async (categoryId: string, categoryData: Partial<ICategory>) => { }

    const deleteCategory = async (categoryId: string) => { }

    return { categoriesState, getCategories, getAvailableCategories, addCategory, updateCategory, deleteCategory }
}