import { useCallback, useReducer } from "react";
import platesServices from "../services/plates-services";
import type { IPlatesActions, IPlatesState } from "../types/reducer-states";
import type { ICategory } from "../types/plate";

const initialState: IPlatesState = {
    loading: false,
    success: false,
    errorMessage: null,
    successMessage: null,
    fetching: false,
    fetchErrorMessage: null,
    categories: [],
    plates: [],
    currentCategory: null,
    currentPlate: null,
    categoryFormFields: {
        name: "",
        description: ""
    },
    plateFormFields: {
        name: "",
        description: "",
        ingredients: [],
        available: true,
        price: 0,
        pairing: ""
    }
}

const platesReducerActions = (state: IPlatesState, action: IPlatesActions): IPlatesState => {
    let updatedCategories: ICategory[]

    switch (action.type) {
        case "SET_CATEGORY_TO_EDIT":
            return {
                ...state,
                currentCategory: action.payload,
                success: action.payload ? state.success : false,
                successMessage: action.payload ? state.successMessage : null,
                errorMessage: action.payload ? state.errorMessage : null,
                categoryFormFields: {
                    ...state.categoryFormFields,
                    name: action.payload ? action.payload.name : "",
                    description: action.payload ? action.payload.description : ""
                }
            }

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

        case "CATEGORY_UPDATE_START":
            return {
                ...state,
                loading: true,
                success: false,
                successMessage: null,
                errorMessage: null
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
                currentCategory: action.payload.category
            }

        case "CATEGORY_UPDATE_FAILURE":
            return {
                ...state,
                loading: false,
                success: false,
                successMessage: null,
                errorMessage: action.payload
            }

        case "CATEGORY_CHANGE_FORM_FIELDS":
            return {
                ...state,
                errorMessage: null,
                categoryFormFields: {
                    ...state.categoryFormFields,
                    [action.payload.name]: action.payload.value
                }
            }

        case "CATEGORIES_CLEAR_FORM_FIELDS":
            return {
                ...state,
                errorMessage: null,
                successMessage: null,
                success: false,
                categoryFormFields: initialState.categoryFormFields
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

    const handleChangeCategoryFormFields = useCallback((name: keyof ICategory, value: string) => {
        dispatch({
            type: "CATEGORY_CHANGE_FORM_FIELDS",
            payload: { name, value }
        })
    }, [])

    const handleClearPlatesData = useCallback(() => {
        dispatch({ type: "PLATES_CLEAR_DATA" })
    }, [])

    const handleClearCategoryFormFields = useCallback(() => {
        dispatch({ type: "CATEGORIES_CLEAR_FORM_FIELDS" })
    }, [])

    const handleSetCategoryToEdit = useCallback((category: ICategory | null) => {
        dispatch({ type: "SET_CATEGORY_TO_EDIT", payload: category })
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

    const handleUpdateCategory = useCallback(async (categoryId: string) => {
        dispatch({ type: "CATEGORY_UPDATE_START" })

        if (!categoryId) {
            dispatch({
                type: "CATEGORY_UPDATE_FAILURE",
                payload: "Erro inesperado ao atualizar categoria."
            })
            return
        }

        if (!platesState.categoryFormFields.name) {
            dispatch({
                type: "CATEGORY_UPDATE_FAILURE",
                payload: "Preencha o nome da categoria."
            })
            return
        }

        const response = await platesServices.updateCategory({
            name: platesState.categoryFormFields.name,
            description: platesState.categoryFormFields.description
        }, categoryId)

        if (!response.success) {
            dispatch({
                type: "CATEGORY_UPDATE_FAILURE",
                payload: response.body.text ?? "Erro ao atualizar categoria."
            })
            return
        }

        dispatch({
            type: "CATEGORY_UPDATE_SUCCESS",
            payload: {
                category: response.body,
                message: "Categoria atualizada com sucesso."
            }
        })
    }, [platesState.categoryFormFields.name, platesState.categoryFormFields.description])

    return {
        ...platesState,
        handleChangeCategoryFormFields,
        handleClearPlatesData,
        handleClearCategoryFormFields,
        handleSetCategoryToEdit,
        handleFetchCategories,
        handleFetchAvailableCategories,
        handleFetchPlates,
        handleFetchAvailablePlates,
        handleUpdateCategory
    }
}