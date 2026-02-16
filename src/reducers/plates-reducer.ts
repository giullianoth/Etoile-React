import { useCallback, useReducer } from "react";
import platesServices from "../services/plates-services";
import type { IPlatesActions, IPlatesState } from "../types/reducer-states";
import type { ICategory, IPlate } from "../types/plate";

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
        pairing: "",
        categoryId: ""
    }
}

const platesReducerActions = (state: IPlatesState, action: IPlatesActions): IPlatesState => {
    let categoriesWithAddedOne: ICategory[]
    let updatedCategories: ICategory[]
    let categoriesWithoutDeleted: ICategory[]
    let platesWithAddedOne: IPlate[]
    let updatedPlates: IPlate[]
    let platesWithoutDeleted: IPlate[]

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

        case "SET_PLATE_TO_EDIT":
            return {
                ...state,
                currentPlate: action.payload,
                success: action.payload ? state.success : false,
                successMessage: action.payload ? state.successMessage : null,
                errorMessage: action.payload ? state.errorMessage : null,
                plateFormFields: {
                    ...state.plateFormFields,
                    name: action.payload ? action.payload.name : "",
                    description: action.payload ? action.payload.description : "",
                    ingredients: action.payload ? action.payload.ingredients : [],
                    available: action.payload ? action.payload.available : false,
                    price: action.payload ? action.payload.price : 0,
                    pairing: action.payload ? action.payload.pairing : "",
                    categoryId: action.payload ? action.payload.categoryId : ""
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
                currentCategory: action.payload.category
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
                currentPlate: action.payload.plate
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

        case "CATEGORY_CHANGE_FORM_FIELDS":
            return {
                ...state,
                errorMessage: null,
                categoryFormFields: {
                    ...state.categoryFormFields,
                    [action.payload.name]: action.payload.value
                }
            }

        case "PLATE_CHANGE_FORM_FIELDS":
            return {
                ...state,
                errorMessage: null,
                plateFormFields: {
                    ...state.plateFormFields,
                    [action.payload.name]: action.payload.name === "ingredients"
                        ? (action.payload.value as string).split(",").map(ingredient => ingredient.trim())
                        : action.payload.value
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

        case "PLATES_CLEAR_FORM_FIELDS":
            return {
                ...state,
                errorMessage: null,
                successMessage: null,
                success: false,
                plateFormFields: initialState.plateFormFields
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

    const handleChangePlateFormFields = useCallback((name: keyof IPlate, value: string | boolean) => {
        dispatch({
            type: "PLATE_CHANGE_FORM_FIELDS",
            payload: { name, value }
        })
    }, [])

    const handleClearPlatesData = useCallback(() => {
        dispatch({ type: "PLATES_CLEAR_DATA" })
    }, [])

    const handleClearCategoryFormFields = useCallback(() => {
        dispatch({ type: "CATEGORIES_CLEAR_FORM_FIELDS" })
    }, [])

    const handleClearPlateFormFields = useCallback(() => {
        dispatch({ type: "PLATES_CLEAR_FORM_FIELDS" })
    }, [])

    const handleSetCategoryToEdit = useCallback((category: ICategory | null) => {
        dispatch({ type: "SET_CATEGORY_TO_EDIT", payload: category })
    }, [])

    const handleSetPlateToEdit = useCallback((plate: IPlate | null) => {
        dispatch({ type: "SET_PLATE_TO_EDIT", payload: plate })
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

    const handleCreateCategory = useCallback(async () => {
        dispatch({ type: "CATEGORY_CREATE_START" })

        if (!platesState.categoryFormFields.name) {
            dispatch({
                type: "CATEGORY_CREATE_FAILURE",
                payload: "Preencha o nome da categoria."
            })
            return
        }

        const response = await platesServices.createCategory({
            name: platesState.categoryFormFields.name,
            description: platesState.categoryFormFields.description
        })

        if (!response.success) {
            dispatch({
                type: "CATEGORY_CREATE_FAILURE",
                payload: response.body.text ?? "Erro ao criar categoria."
            })
            return
        }

        dispatch({
            type: "CATEGORY_CREATE_SUCCESS",
            payload: {
                category: response.body,
                message: "Categoria criada com sucesso."
            }
        })
    }, [platesState.categoryFormFields.name, platesState.categoryFormFields.description])

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

    const handleUpdatePlate = useCallback(async (plateId: string, image?: File | null) => {
        dispatch({ type: "PLATE_UPDATE_START" })

        if (!plateId) {
            dispatch({
                type: "PLATE_UPDATE_FAILURE",
                payload: "Erro inesperado ao atualizar prato."
            })
            return
        }

        if (!platesState.plateFormFields.name) {
            dispatch({
                type: "PLATE_UPDATE_FAILURE",
                payload: "Preencha o nome do prato."
            })
            return
        }

        if (!platesState.plateFormFields.ingredients || !platesState.plateFormFields.ingredients.length) {
            dispatch({
                type: "PLATE_UPDATE_FAILURE",
                payload: "Insira pelo menos um ingrediente."
            })
            return
        }

        if (!platesState.plateFormFields.categoryId) {
            dispatch({
                type: "PLATE_UPDATE_FAILURE",
                payload: "Selecione a categoria."
            })
            return
        }

        if (!platesState.plateFormFields.price) {
            dispatch({
                type: "PLATE_UPDATE_FAILURE",
                payload: "Preencha o preço."
            })
            return
        }

        const formData = new FormData()

        Object.keys(platesState.plateFormFields).forEach(key => {
            formData.append(
                key,
                key === "ingredients"
                    ? JSON.stringify(platesState.plateFormFields[key])
                    : String(platesState.plateFormFields[key as keyof IPlate])
            )
        })

        if (image) {
            if (!image.type.includes("png") && !image.type.includes("jpeg") && !image.type.includes("jpg")) {
                dispatch({
                    type: "PLATE_UPDATE_FAILURE",
                    payload: "Formato de imagem inválido. Utilize PNG ou JPEG."
                })
                return
            }

            if (image.size > 5 * 1024 * 1024) {
                dispatch({
                    type: "PLATE_UPDATE_FAILURE",
                    payload: "Tamanho da imagem excede o limite de 5MB."
                })
                return
            }

            formData.append("image", image)
        }

        const response = await platesServices.updatePlate(formData, plateId)

        if (!response.success) {
            dispatch({
                type: "PLATE_UPDATE_FAILURE",
                payload: "Erro ao atualizar prato."
            })
            return
        }

        dispatch({
            type: "PLATE_UPDATE_SUCCESS",
            payload: {
                plate: response.body,
                message: "Prato atualizado com sucesso."
            }
        })
    }, [platesState.plateFormFields])

    const handleDeleteCategory = useCallback(async (categoryId: string) => {
        dispatch({ type: "CATEGORY_DELETE_START" })

        if (!categoryId) {
            dispatch({
                type: "CATEGORY_DELETE_FAILURE",
                payload: "Erro inesperado ao excluir categoria."
            })
            return
        }

        const response = await platesServices.deleteCategory(categoryId)

        if (!response.success) {
            dispatch({
                type: "CATEGORY_DELETE_FAILURE",
                payload: response.body.text ?? "Erro ao excluir categoria."
            })
            return
        }

        dispatch({
            type: "CATEGORY_DELETE_SUCCESS",
            payload: {
                categoryId: response.body._id,
                message: "Categoria excluída com sucesso."
            }
        })
    }, [])

    return {
        ...platesState,
        handleChangeCategoryFormFields,
        handleChangePlateFormFields,
        handleClearPlatesData,
        handleClearCategoryFormFields,
        handleClearPlateFormFields,
        handleSetCategoryToEdit,
        handleSetPlateToEdit,
        handleFetchCategories,
        handleFetchAvailableCategories,
        handleFetchPlates,
        handleFetchAvailablePlates,
        handleCreateCategory,
        handleUpdateCategory,
        handleUpdatePlate,
        handleDeleteCategory
    }
}