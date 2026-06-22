import { useCallback, useReducer } from "react"
import type { IPlatesReducer, IPlatesReducerActions, IPlatesReducerState } from "../types/reducer-states"
import platesServices from "../services/plates"
import type { ICategory, IPlate } from "../types/plate"

const initialState: IPlatesReducerState = {
    fetching: false,
    fetchErrorMessage: null,
    mutating: false,
    mutateSuccess: false,
    mutateSuccessMessage: null,
    mutateErrorMessage: null,
    deleting: false,
    deleteSuccess: false,
    deleteSuccessMessage: null,
    deleteErrorMessage: null,
    categories: [],
    currentCategory: null,
    plates: [],
    currentPlate: null,
}

const platesReducerActions = (state: IPlatesReducerState, action: IPlatesReducerActions): IPlatesReducerState => {
    let updatedCategories: ICategory[]
    let updatedPlates: IPlate[]

    switch (action.type) {
        case "PLATES_FETCH_START":
            return {
                ...state,
                fetching: true,
                fetchErrorMessage: null,
            }

        case "PLATES_FETCH_SUCCESS":
            return {
                ...state,
                fetching: false,
                fetchErrorMessage: null,
                categories: action.payload.categories || state.categories,
                plates: action.payload.plates || state.plates,
            }

        case "PLATES_FETCH_FAILURE":
            return {
                ...state,
                fetching: false,
                fetchErrorMessage: action.payload,
            }

        case "PLATES_MUTATE_START":
            return {
                ...state,
                mutating: true,
                mutateSuccess: false,
                mutateSuccessMessage: null,
                mutateErrorMessage: null,
            }

        case "PLATES_CATEGORY_MUTATE_SUCCESS":
            updatedCategories = state.categories.some(category => category._id === action.payload.category._id)
                ? state.categories.map(category => {
                    if (category._id === action.payload.category._id) {
                        return {
                            ...category,
                            ...action.payload.category
                        }
                    }
                    return category
                })
                : [...state.categories, action.payload.category]

            return {
                ...state,
                mutating: false,
                mutateSuccess: true,
                mutateSuccessMessage: action.payload.message,
                mutateErrorMessage: null,
                categories: updatedCategories,
                currentCategory: action.payload.category
            }

        case "PLATES_MUTATE_SUCCESS":
            updatedPlates = state.plates.some(plate => plate._id === action.payload.plate._id)
                ? state.plates.map(plate => {
                    if (plate._id === action.payload.plate._id) {
                        return {
                            ...plate,
                            ...action.payload.plate
                        }
                    }
                    return plate
                })
                : [...state.plates, action.payload.plate]

            return {
                ...state,
                mutating: false,
                mutateSuccess: true,
                mutateSuccessMessage: action.payload.message,
                mutateErrorMessage: null,
                plates: updatedPlates,
                currentPlate: action.payload.plate
            }

        case "PLATES_MUTATE_FAILURE":
            return {
                ...state,
                mutating: false,
                mutateSuccess: false,
                mutateSuccessMessage: null,
                mutateErrorMessage: action.payload,
            }

        case "PLATES_DELETE_START":
            return {
                ...state,
                deleting: true,
                deleteSuccess: false,
                deleteSuccessMessage: null,
                deleteErrorMessage: null,
            }

        case "PLATES_DELETE_SUCCESS":
            updatedPlates = state.plates.filter(plate => plate._id !== action.payload.plateId)

            return {
                ...state,
                deleting: false,
                deleteSuccess: true,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: null,
                plates: updatedPlates
            }

        case "PLATES_CATEGORY_DELETE_SUCCESS":
            updatedCategories = state.categories.filter(category => category._id !== action.payload.categoryId)

            return {
                ...state,
                deleting: false,
                deleteSuccess: true,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: null,
                categories: updatedCategories
            }

        case "PLATES_DELETE_FAILURE":
            return {
                ...state,
                deleting: false,
                deleteSuccess: false,
                deleteSuccessMessage: null,
                deleteErrorMessage: action.payload,
            }

        case "SET_CATEGORY_TO_EDIT":
            return {
                ...state,
                currentCategory: action.payload
            }

        case "SET_PLATE_TO_EDIT":
            return {
                ...state,
                currentPlate: action.payload
            }

        case "PLATES_RESET_MESSAGES":
            return {
                ...state,
                fetchErrorMessage: null,
                mutateSuccessMessage: null,
                mutateErrorMessage: null,
                deleteSuccessMessage: null,
                deleteErrorMessage: null,
            }

        default:
            return state
    }
}

export const usePlatesReducer = (): IPlatesReducer => {
    const [platesState, dispatch] = useReducer<
        IPlatesReducerState,
        [action: IPlatesReducerActions]
    >(platesReducerActions, initialState)

    const handleResetPlatesMessages = useCallback(() => {
        dispatch({ type: "PLATES_RESET_MESSAGES" })
    }, [])

    const handleSetCategoryToEdit = useCallback((category: ICategory | null) => {
        dispatch({ type: "SET_CATEGORY_TO_EDIT", payload: category })
    }, [])

    const handleSetPlateToEdit = useCallback((plate: IPlate | null) => {
        dispatch({ type: "SET_PLATE_TO_EDIT", payload: plate })
    }, [])

    const handleFetchCategories = useCallback(async () => {
        dispatch({ type: "PLATES_FETCH_START" })

        const response = await platesServices.fetchCategories()

        if (!response.success) {
            return dispatch({
                type: "PLATES_FETCH_FAILURE",
                payload: response.body.text || "Erro ao buscar categorias."
            })
        }

        return dispatch({
            type: "PLATES_FETCH_SUCCESS",
            payload: { categories: response.body as ICategory[] }
        })
    }, [])

    const handleFetchAvailableCategories = useCallback(async () => {
        dispatch({ type: "PLATES_FETCH_START" })

        const response = await platesServices.fetchAvailableCategories()

        if (!response.success) {
            return dispatch({
                type: "PLATES_FETCH_FAILURE",
                payload: response.body.text || "Erro ao buscar categorias."
            })
        }

        return dispatch({
            type: "PLATES_FETCH_SUCCESS",
            payload: { categories: response.body as ICategory[] }
        })
    }, [])

    const handleFetchPlates = useCallback(async () => {
        dispatch({ type: "PLATES_FETCH_START" })

        const response = await platesServices.fetchPlates()

        if (!response.success) {
            return dispatch({
                type: "PLATES_FETCH_FAILURE",
                payload: response.body.text || "Erro ao buscar pratos."
            })
        }

        return dispatch({
            type: "PLATES_FETCH_SUCCESS",
            payload: { plates: response.body as IPlate[] }
        })
    }, [])

    const handleFetchAvailablePlates = useCallback(async () => {
        dispatch({ type: "PLATES_FETCH_START" })

        const response = await platesServices.fetchAvailablePlates()

        if (!response.success) {
            return dispatch({
                type: "PLATES_FETCH_FAILURE",
                payload: response.body.text || "Erro ao buscar pratos."
            })
        }

        return dispatch({
            type: "PLATES_FETCH_SUCCESS",
            payload: { plates: response.body as IPlate[] }
        })
    }, [])

    const handleCreateCategory = useCallback(async (categoryData: Partial<ICategory>) => {
        dispatch({ type: "PLATES_MUTATE_START" })

        if (!categoryData.name) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Preencha o nome da categoria."
            })
        }

        if (!categoryData.description) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Forneça a descrição da categoria."
            })
        }

        const response = await platesServices.createCategory(categoryData)

        if (!response.success) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao criar categoria."
            })
        }

        return dispatch({
            type: "PLATES_CATEGORY_MUTATE_SUCCESS",
            payload: {
                category: response.body as ICategory,
                message: "Categoria criada com sucesso."
            }
        })
    }, [])

    const handleCreatePlate = useCallback(async (plateData: Partial<IPlate>, plateImage: File | null) => {
        dispatch({ type: "PLATES_MUTATE_START" })

        if (!plateData.name) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Preencha o nome."
            })
        }

        if (!plateData.ingredients) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Informe pelo menos um ingrediente."
            })
        }

        if (!plateData.categoryId) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Selecione a categoria."
            })
        }

        if (!plateData.price) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Informe o preço."
            })
        }

        const formData = new FormData()

        Object.keys(plateData).forEach(key => {
            if (key === "ingredients" || key === "available") {
                formData.append(key, JSON.stringify(plateData[key as keyof IPlate]))
            } else {
                formData.append(key, plateData[key as keyof IPlate] as string)
            }
        })

        if (plateImage) {
            if (!plateImage.type.includes("png") && !plateImage.type.includes("jpeg") && !plateImage.type.includes("jpg")) {
                return dispatch({
                    type: "PLATES_MUTATE_FAILURE",
                    payload: "Formato de imagem inválido. Utilize PNG ou JPEG."
                })
            }

            if (plateImage.size > 5 * 1024 * 1024) {
                return dispatch({
                    type: "PLATES_MUTATE_FAILURE",
                    payload: "O tamanho da foto deve ser até 5MB."
                })
            }

            formData.append("image", plateImage)
        }

        const response = await platesServices.createPlate(formData)

        if (!response.success) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao criar prato."
            })
        }

        return dispatch({
            type: "PLATES_MUTATE_SUCCESS",
            payload: {
                plate: response.body as IPlate,
                message: "Prato criado com sucesso."
            }
        })
    }, [])

    const handleUpdateCategory = useCallback(async (categoryData: Partial<ICategory>, categoryId: string) => {
        dispatch({ type: "PLATES_MUTATE_START" })

        if (!categoryId) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Erro inesperado ao atualizar categoria."
            })
        }

        if (!categoryData.name) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Preencha o nome da categoria."
            })
        }

        if (!categoryData.description) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Forneça a descrição da categoria."
            })
        }

        const response = await platesServices.updateCategory(categoryData, categoryId)

        if (!response.success) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao atualizar categoria."
            })
        }

        return dispatch({
            type: "PLATES_CATEGORY_MUTATE_SUCCESS",
            payload: {
                category: response.body as ICategory,
                message: "Categoria atualizada com sucesso."
            }
        })
    }, [])

    const handleUpdatePlate = useCallback(async (
        plateData: Partial<IPlate>,
        plateImage: File | null,
        plateId: string
    ) => {
        dispatch({ type: "PLATES_MUTATE_START" })

        if (!plateId) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Erro inesperado ao atualizar prato."
            })
        }

        if (!plateData.name) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Preencha o nome."
            })
        }

        if (!plateData.ingredients) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Informe pelo menos um ingrediente."
            })
        }

        if (!plateData.categoryId) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Selecione a categoria."
            })
        }

        if (!plateData.price) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Informe o preço."
            })
        }

        const formData = new FormData()

        Object.keys(plateData).forEach(key => {
            if (key === "ingredients" || key === "available") {
                formData.append(key, JSON.stringify(plateData[key as keyof IPlate]))
            } else {
                formData.append(key, plateData[key as keyof IPlate] as string)
            }
        })

        if (plateImage) {
            if (!plateImage.type.includes("png") && !plateImage.type.includes("jpeg") && !plateImage.type.includes("jpg")) {
                return dispatch({
                    type: "PLATES_MUTATE_FAILURE",
                    payload: "Formato de imagem inválido. Utilize PNG ou JPEG."
                })
            }

            if (plateImage.size > 5 * 1024 * 1024) {
                return dispatch({
                    type: "PLATES_MUTATE_FAILURE",
                    payload: "O tamanho da foto deve ser até 5MB."
                })
            }

            formData.append("image", plateImage)
        }

        const response = await platesServices.updatePlate(formData, plateId)

        if (!response.success) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao atualizar prato."
            })
        }

        return dispatch({
            type: "PLATES_MUTATE_SUCCESS",
            payload: {
                plate: response.body as IPlate,
                message: "Prato atualizado com sucesso."
            }
        })
    }, [])

    const handleDeleteCategory = useCallback(async (categoryId: string) => {
        dispatch({ type: "PLATES_DELETE_START" })

        if (!categoryId) {
            return dispatch({
                type: "PLATES_DELETE_FAILURE",
                payload: "Erro inesperado ao excluir categoria."
            })
        }

        const response = await platesServices.deleteCategory(categoryId)

        if (!response.success) {
            return dispatch({
                type: "PLATES_DELETE_FAILURE",
                payload: response.body.text || "Erro ao excluir categoria."
            })
        }

        return dispatch({
            type: "PLATES_CATEGORY_DELETE_SUCCESS",
            payload: {
                categoryId: response.body._id,
                message: "Categoria excluída com sucesso."
            }
        })
    }, [])

    const handleDeletePlate = useCallback(async (plateId: string) => {
        dispatch({ type: "PLATES_DELETE_START" })

        if (!plateId) {
            return dispatch({
                type: "PLATES_DELETE_FAILURE",
                payload: "Erro inesperado ao excluir prato."
            })
        }

        const response = await platesServices.deletePlate(plateId)

        if (!response.success) {
            return dispatch({
                type: "PLATES_DELETE_FAILURE",
                payload: response.body.text || "Erro ao excluir prato."
            })
        }

        return dispatch({
            type: "PLATES_DELETE_SUCCESS",
            payload: {
                plateId: response.body._id,
                message: "Prato excluído com sucesso."
            }
        })
    }, [])

    const handleDisablePlate = useCallback(async (plateId: string) => {
        dispatch({ type: "PLATES_MUTATE_START" })

        if (!plateId) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Erro inesperado ao desativar prato."
            })
        }

        const response = await platesServices.disablePlate(plateId)

        if (!response.success) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao desativar prato."
            })
        }

        return dispatch({
            type: "PLATES_MUTATE_SUCCESS",
            payload: {
                plate: response.body as IPlate,
                message: "Prato desativado com sucesso."
            }
        })
    }, [])

    const handleEnablePlate = useCallback(async (plateId: string) => {
        dispatch({ type: "PLATES_MUTATE_START" })

        if (!plateId) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: "Erro inesperado ao ativar prato."
            })
        }

        const response = await platesServices.enablePlate(plateId)

        if (!response.success) {
            return dispatch({
                type: "PLATES_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao ativar prato."
            })
        }

        return dispatch({
            type: "PLATES_MUTATE_SUCCESS",
            payload: {
                plate: response.body as IPlate,
                message: "Prato ativado com sucesso."
            }
        })
    }, [])

    return {
        ...platesState,
        handleResetPlatesMessages,
        handleSetCategoryToEdit,
        handleSetPlateToEdit,
        handleFetchCategories,
        handleFetchAvailableCategories,
        handleFetchPlates,
        handleFetchAvailablePlates,
        handleCreateCategory,
        handleCreatePlate,
        handleUpdateCategory,
        handleUpdatePlate,
        handleDeleteCategory,
        handleDeletePlate,
        handleDisablePlate,
        handleEnablePlate,
    }
}