import { useCallback, useReducer } from "react";
import platesServices from "../services/plates-services";
import type { IPlatesActions, IPlatesState } from "../types/reducer-states";
import type { ICategory, IPlate } from "../types/plate";
import type { IPlatesContext } from "../types/context";

const initialState: IPlatesState = {
    loading: false,
    success: false,
    errorMessage: null,
    successMessage: null,
    fetching: false,
    fetchErrorMessage: null,
    categories: [],
    plates: [],
}

const platesReducerActions = (state: IPlatesState, action: IPlatesActions): IPlatesState => {
    let categoriesWithAddedOne: ICategory[]
    let updatedCategories: ICategory[]
    let categoriesWithoutDeleted: ICategory[]
    let platesWithAddedOne: IPlate[]
    let updatedPlates: IPlate[]
    let platesWithoutDeleted: IPlate[]

    switch (action.type) {
        case "CATEGORIES_FETCH_START":
        case "PLATES_FETCH_START":
            return {
                ...state,
                fetching: true,
                success: false,
                successMessage: null,
                fetchErrorMessage: null
            }

        case "CATEGORIES_FETCH_SUCCESS":
            return {
                ...state,
                fetching: false,
                fetchErrorMessage: null,
                categories: action.payload
            }

        case "PLATES_FETCH_SUCCESS":
            return {
                ...state,
                fetching: false,
                fetchErrorMessage: null,
                plates: action.payload
            }

        case "CATEGORIES_FETCH_FAILURE":
        case "PLATES_FETCH_FAILURE":
            return {
                ...state,
                fetching: false,
                success: false,
                successMessage: null,
                fetchErrorMessage: action.payload
            }

        case "CATEGORY_CREATE_START":
        case "CATEGORY_UPDATE_START":
        case "CATEGORY_DELETE_START":
            return {
                ...state,
                loading: true,
                success: false,
                successMessage: null,
                errorMessage: null
            }

        case "CATEGORY_CREATE_SUCCESS":
            categoriesWithAddedOne = [...state.categories, action.payload.category]

            return {
                ...state,
                loading: false,
                success: true,
                successMessage: action.payload.message,
                errorMessage: null,
                categories: categoriesWithAddedOne
            }

        case "CATEGORY_UPDATE_SUCCESS":
            updatedCategories = state.categories.map(category =>
                category._id === action.payload.category._id
                    ? action.payload.category : category)

            return {
                ...state,
                loading: false,
                success: true,
                successMessage: action.payload.message,
                errorMessage: null,
                categories: updatedCategories,
            }

        case "CATEGORY_DELETE_SUCCESS":
            categoriesWithoutDeleted = state.categories.filter(category =>
                category._id !== action.payload.categoryId)

            return {
                ...state,
                loading: false,
                success: true,
                successMessage: action.payload.message,
                errorMessage: null,
                categories: categoriesWithoutDeleted
            }

        case "PLATE_CREATE_START":
        case "PLATE_UPDATE_START":
        case "PLATE_DELETE_START":
            return {
                ...state,
                loading: true,
                success: false,
                successMessage: null,
                errorMessage: null
            }

        case "PLATE_CREATE_SUCCESS":
            platesWithAddedOne = [...state.plates, action.payload.plate]

            return {
                ...state,
                loading: false,
                success: true,
                successMessage: action.payload.message,
                errorMessage: null,
                plates: platesWithAddedOne
            }

        case "PLATE_UPDATE_SUCCESS":
            updatedPlates = state.plates.map(plate =>
                plate._id === action.payload.plate._id
                    ? action.payload.plate : plate)

            return {
                ...state,
                loading: false,
                success: true,
                successMessage: action.payload.message,
                errorMessage: null,
                plates: updatedPlates,
            }

        case "PLATE_DELETE_SUCCESS":
            platesWithoutDeleted = state.plates.filter(plate =>
                plate._id !== action.payload.plateId)

            return {
                ...state,
                loading: false,
                success: true,
                successMessage: action.payload.message,
                errorMessage: null,
                plates: platesWithoutDeleted
            }

        case "CATEGORY_CREATE_FAILURE":
        case "CATEGORY_UPDATE_FAILURE":
        case "CATEGORY_DELETE_FAILURE":
        case "PLATE_CREATE_FAILURE":
        case "PLATE_UPDATE_FAILURE":
        case "PLATE_DELETE_FAILURE":
            return {
                ...state,
                loading: false,
                success: false,
                successMessage: null,
                errorMessage: action.payload
            }

        default:
            return state
    }
}

export const usePlatesReducer = (): IPlatesContext => {
    const [platesState, dispatch] = useReducer<
        IPlatesState,
        [action: IPlatesActions]
    >(platesReducerActions, initialState)

    const handleFetchCategories = useCallback(async () => {

    }, [])

    const handleFetchAvailableCategories = useCallback(async () => {
        dispatch({ type: "CATEGORIES_FETCH_START" })

        const response = await platesServices.fetchAvailableCategories()

        if (!response.success) {
            dispatch({
                type: "CATEGORIES_FETCH_FAILURE",
                payload: response.body.text || "Erro ao buscar categorias."
            })
            return
        }

        dispatch({
            type: "CATEGORIES_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleFetchPlates = useCallback(async () => {

    }, [])

    const handleFetchAvailablePlates = useCallback(async () => {
        dispatch({ type: "PLATES_FETCH_START" })

        const response = await platesServices.fetchAvailablePlates()

        if (!response.success) {
            dispatch({
                type: "PLATES_FETCH_FAILURE",
                payload: response.body.text || "Erro ao buscar pratos."
            })
            return
        }

        dispatch({
            type: "PLATES_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleFetchAvailablePlatesByCategory = useCallback(async (categoryId: string) => {

    }, [])

    const handleCreateCategory = useCallback(async () => {

    }, [])

    const handleUpdateCategory = useCallback(async (categoryId: string) => {

    }, [])

    const handleUpdatePlate = useCallback(async (plateId: string, image?: File | null) => {

    }, [])

    const handleDeleteCategory = useCallback(async (categoryId: string) => {

    }, [])

    return {
        ...platesState,
        handleFetchCategories,
        handleFetchAvailableCategories,
        handleFetchPlates,
        handleFetchAvailablePlates,
        handleFetchAvailablePlatesByCategory,
        handleCreateCategory,
        handleUpdateCategory,
        handleUpdatePlate,
        handleDeleteCategory
    }
}