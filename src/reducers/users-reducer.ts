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
    currentUser: null
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

        case "SET_USER_TO_EDIT":
            return {
                ...state,
                currentUser: action.payload
            }

        case "USERS_RESET":
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

export const useUsersReducer = (handleUpdateLoggedUser: (userData: IUser) => void) => {
    const [usersState, dispatch] = useReducer<
        IUsersState,
        [action: IUsersActions]
    >(usersReducerActions, initialState)

    const handleResetUsers = useCallback(() => {
        dispatch({ type: "USERS_RESET" })
    }, [])

    const handleSetUserToEdit = useCallback((userData: IUser | null) => {
        dispatch({
            type: "SET_USER_TO_EDIT",
            payload: userData
        })
    }, [])

    const handleUpdateUser = useCallback(async (userData: Partial<IUserUpdate>) => {
        dispatch({ type: "USERS_UPDATE_START" })

        if (!usersState.currentUser) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: "Erro inesperado ao atualizar perfil."
            })
            return
        }

        if (!userData.fullname) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: "Preencha o nome."
            })
            return
        }

        if (userData.changePassword) {
            if (!userData.password) {
                dispatch({
                    type: "USERS_UPDATE_FAILURE",
                    payload: "Preencha a senha."
                })
                return
            }

            if (!userData.newPassword) {
                dispatch({
                    type: "USERS_UPDATE_FAILURE",
                    payload: "Preencha a nova senha."
                })
                return
            }

            if (!userData.confirmPassword) {
                dispatch({
                    type: "USERS_UPDATE_FAILURE",
                    payload: "Confirme a nova senha."
                })
                return
            }

            if (userData.newPassword !== userData.confirmPassword) {
                dispatch({
                    type: "USERS_UPDATE_FAILURE",
                    payload: "As senhas não conferem."
                })
                return
            }

            const checkPassword = await authServices.login({
                email: usersState.currentUser.email,
                password: userData.password
            })

            if (!checkPassword.success) {
                dispatch({
                    type: "USERS_UPDATE_FAILURE",
                    payload: "Senha incorreta."
                })
                return
            }
            
            const password = userData.newPassword
            userData.password = password
            delete userData.newPassword
            delete userData.confirmPassword
        }

        delete userData.changePassword

        const response = await usersServices.updateUser(userData, usersState.currentUser._id)

        if (!response.success) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: response.body.text || "Erro ao atualizar perfil."
            })
            return
        }

        storageUpdatedUserData(response.body)
        handleUpdateLoggedUser(response.body)

        dispatch({
            type: "USERS_UPDATE_SUCCESS",
            payload: "Perfil atualizado com sucesso."
        })
    }, [usersState.currentUser, handleUpdateLoggedUser])

    const handleUpdateUserPhoto = useCallback(async (photo: File) => {
        dispatch({ type: "USERS_UPDATE_START" })

        if (!usersState.currentUser?._id) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: "Erro inesperado ao atualizar foto de perfil."
            })
            return
        }

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
                payload: "O tamanho da foto deve ser até 5MB."
            })
            return
        }

        const formData = new FormData()
        formData.append("photo", photo)

        const response = await usersServices.updateUserPhoto(
            formData,
            usersState.currentUser?._id
        )

        if (!response.success) {
            dispatch({
                type: "USERS_UPDATE_FAILURE",
                payload: "Erro ao atualizar foto de perfil."
            })
            return
        }

        storageUpdatedUserData(response.body)
        handleUpdateLoggedUser(response.body)

        dispatch({
            type: "USERS_UPDATE_SUCCESS",
            payload: "Foto de perfil atualizada com sucesso."
        })
    }, [usersState.currentUser, handleUpdateLoggedUser])

    return {
        ...usersState,
        handleResetUsers,
        handleSetUserToEdit,
        handleUpdateUser,
        handleUpdateUserPhoto
    }
}