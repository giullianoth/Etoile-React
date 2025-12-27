import { useCallback, useReducer } from "react"
import type { IUsersActions, IUsersState } from "../types/reducer-states"
import type { IUser, IUserUpdate } from "../types/user"
import authServices from "../services/auth-service"
import usersServices from "../services/users-service"

const initialState: IUsersState = {
    loading: false,
    success: false,
    errorMessage: null,
    successMessage: null,
    currentUser: null,
    userUpdateFormFields: {
        fullname: "",
        phone: "",
        changePassword: false,
        password: "",
        newPassword: "",
        confirmPassword: ""
    }
}

const usersReducerActions = (state: IUsersState, action: IUsersActions): IUsersState => {
    switch (action.type) {
        case "USERS_UPDATE_START":
            return {
                ...state,
                loading: true,
                success: false,
                errorMessage: null,
                successMessage: null
            }

        case "USERS_UPDATE_SUCCESS":
            return {
                ...state,
                loading: false,
                success: true,
                errorMessage: null,
                successMessage: action.payload
            }

        case "USERS_UPDATE_FAILURE":
            return {
                ...state,
                loading: false,
                success: false,
                errorMessage: action.payload,
                successMessage: null
            }

        case "USERS_UPDATE_CHANGE_FORM_FIELDS":
            return {
                ...state,
                errorMessage: null,
                userUpdateFormFields: {
                    ...state.userUpdateFormFields,
                    [action.payload.name]: action.payload.value
                }
            }

        case "SET_USER_TO_EDIT":
            return {
                ...state,
                currentUser: action.payload,
                userUpdateFormFields: {
                    ...state.userUpdateFormFields,
                    fullname: action.payload?.fullname ?? "",
                    phone: action.payload?.phone ?? ""
                }
            }

        case "USERS_CLEAR_FORM_FIELDS":
            return {
                ...state,
                success: false,
                errorMessage: null,
                successMessage: null,
                userUpdateFormFields: initialState.userUpdateFormFields
            }

        case "USERS_CLEAR_DATA":
            return initialState

        default:
            return state
    }
}

const storageUpdatedUserData = (userData: IUser) => {
    const storagedUserData = JSON.parse(localStorage.getItem("etoile-auth")!)

    const newUserData = {
        user: userData,
        token: storagedUserData.token
    }

    localStorage.setItem("etoile-auth", JSON.stringify(newUserData))
}

export const useUsersReducer = () => {
    const [usersState, dispatch] = useReducer<
        IUsersState,
        [action: IUsersActions]
    >(usersReducerActions, initialState)

    const handleChangeUsersUpdateFormFields = useCallback((name: keyof IUserUpdate, value: string | boolean) => {
        dispatch({
            type: "USERS_UPDATE_CHANGE_FORM_FIELDS",
            payload: { name, value }
        })
    }, [])

    const handleClearUsersFormFields = useCallback(() => {
        dispatch({ type: "USERS_CLEAR_FORM_FIELDS" })
    }, [])

    const handleClearUsersData = useCallback(() => {
        dispatch({ type: "USERS_CLEAR_DATA" })
    }, [])

    const handleSetUserToEdit = useCallback((userData: IUser | null) => {
        dispatch({
            type: "SET_USER_TO_EDIT",
            payload: userData
        })
    }, [])

    const handleUpdateUser = useCallback(async () => {
        dispatch({ type: "USERS_UPDATE_START" })

        if (!usersState.userUpdateFormFields.fullname) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: "Preencha o nome."
            })
            return
        }

        if (usersState.userUpdateFormFields.changePassword) {
            if (!usersState.userUpdateFormFields.password) {
                dispatch({
                    type: "USERS_UPDATE_FAILURE",
                    payload: "Digite a sua senha atual."
                })
                return
            }

            if (!usersState.userUpdateFormFields.newPassword) {
                dispatch({
                    type: "USERS_UPDATE_FAILURE",
                    payload: "Digite a sua nova senha."
                })
                return
            }

            if (!usersState.userUpdateFormFields.confirmPassword) {
                dispatch({
                    type: "USERS_UPDATE_FAILURE",
                    payload: "Confirme a sua nova senha."
                })
                return
            }

            if (usersState.userUpdateFormFields.newPassword !== usersState.userUpdateFormFields.confirmPassword) {
                dispatch({
                    type: "USERS_UPDATE_FAILURE",
                    payload: "As senhas digitadas não conferem."
                })
                return
            }

            const checkPassword = await authServices.login({
                email: usersState.currentUser?.email,
                password: usersState.userUpdateFormFields.password
            })

            if (!checkPassword.success) {
                dispatch({
                    type: "USERS_UPDATE_FAILURE",
                    payload: "Senha atual incorreta."
                })
                return
            }
        }

        const { changePassword, ...userDataRest } = usersState.userUpdateFormFields

        if (!userDataRest.phone) {
            delete userDataRest.phone
        }

        if (changePassword) {
            userDataRest.password = userDataRest.newPassword
        } else {
            delete userDataRest.password
        }

        delete userDataRest.newPassword
        delete userDataRest.confirmPassword

        const response = await usersServices.updateUser(
            userDataRest,
            usersState.currentUser?._id!
        )

        if (!response.success) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: "Erro ao atualizar perfil."
            })
            return
        }

        storageUpdatedUserData(response.body)

        dispatch({
            type: "USERS_UPDATE_SUCCESS",
            payload: "Perfil atualizado com sucesso."
        })
    }, [usersState.userUpdateFormFields])

    const handleUpdateUserPhoto = useCallback(async (photo: File) => {
        dispatch({ type: "USERS_UPDATE_START" })

        if (!photo) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: "Selecione uma foto para atualizar."
            })
            return
        }

        if (!photo.type.includes("png") && !photo.type.includes("jpeg") && !photo.type.includes("jpg")) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: "Formato de imagem inválido. Utilize PNG ou JPEG."
            })
            return
        }

        if (photo.size > 5 * 1024 * 1024) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: "Tamanho da imagem excede o limite de 5MB."
            })
            return
        }

        const formData = new FormData()
        formData.append("photo", photo)

        const response = await usersServices.updateUserPhoto(
            formData,
            usersState.currentUser?._id!
        )

        if (!response.success) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: "Erro ao atualizar foto de perfil."
            })
            return
        }

        storageUpdatedUserData(response.body)

        dispatch({
            type: "USERS_UPDATE_SUCCESS",
            payload: "Foto de perfil atualizada com sucesso."
        })
    }, [usersState.currentUser])

    return {
        ...usersState,
        handleChangeUsersUpdateFormFields,
        handleClearUsersFormFields,
        handleClearUsersData,
        handleSetUserToEdit,
        handleUpdateUser,
        handleUpdateUserPhoto
    }
}