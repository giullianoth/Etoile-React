import { useCallback, useReducer } from "react"
import type { IUsersReducer, IUsersReducerActions, IUsersReducerState } from "../types/reducer-states"
import type { IUser, IUserCreate, IUserUpdate } from "../types/user"
import authServices from "../services/auth"
import usersServices from "../services/user"
import { useValidateEmail } from "../hooks/validate-email"

const initialState: IUsersReducerState = {
    fetching: false,
    fetchSuccess: false,
    fetchErrorMessage: null,
    mutating: false,
    mutateSuccess: false,
    mutateSuccessMessage: null,
    mutateErrorMessage: null,
    deleting: false,
    deleteSuccess: false,
    deleteSuccessMessage: null,
    deleteErrorMessage: null,
    users: [],
    currentUser: null,
}

const usersReducerActions = (state: IUsersReducerState, action: IUsersReducerActions): IUsersReducerState => {
    let updatedUsers: IUser[]

    switch (action.type) {
        case "USERS_FETCH_START":
            return {
                ...state,
                fetching: true,
                fetchSuccess: false,
                fetchErrorMessage: null,
            }

        case "USERS_FETCH_SUCCESS":
            return {
                ...state,
                fetching: false,
                fetchSuccess: true,
                fetchErrorMessage: null,
                users: action.payload
            }

        case "USERS_FETCH_FAILURE":
            return {
                ...state,
                fetching: false,
                fetchSuccess: false,
                fetchErrorMessage: action.payload,
            }

        case "USERS_MUTATE_START":
            return {
                ...state,
                mutating: true,
                mutateSuccess: false,
                mutateSuccessMessage: null,
                mutateErrorMessage: null,
            }

        case "USERS_MUTATE_SUCCESS":
            updatedUsers = state.users.some(user => user._id === action.payload.user._id)
                ? state.users.map(user => {
                    if (user._id === action.payload.user._id) {
                        return {
                            ...user,
                            ...action.payload.user
                        }
                    }
                    return user
                })
                : [...state.users, action.payload.user]

            return {
                ...state,
                mutating: false,
                mutateSuccess: true,
                mutateSuccessMessage: action.payload.message,
                mutateErrorMessage: null,
                users: updatedUsers,
                currentUser: action.payload.user,
            }

        case "USERS_MUTATE_FAILURE":
            return {
                ...state,
                mutating: false,
                mutateSuccess: false,
                mutateSuccessMessage: null,
                mutateErrorMessage: action.payload
            }

        case "USERS_DELETE_START":
            return {
                ...state,
                deleting: true,
                deleteSuccess: false,
                deleteSuccessMessage: null,
                deleteErrorMessage: null,
            }

        case "USERS_DELETE_SUCCESS": {
            updatedUsers = state.users.filter(user => user._id !== action.payload.userId)

            return {
                ...state,
                deleting: false,
                deleteSuccess: true,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: null,
                users: updatedUsers,
            }
        }

        case "USERS_DELETE_FAILURE":
            return {
                ...state,
                deleting: false,
                deleteSuccess: false,
                deleteSuccessMessage: null,
                deleteErrorMessage: action.payload,
            }

        case "SET_USER_TO_EDIT":
            return {
                ...state,
                currentUser: action.payload,
            }

        case "USERS_RESET_MESSAGES":
            return {
                ...state,
                fetchErrorMessage: null,
                mutateSuccessMessage: null,
                mutateErrorMessage: null,
            }

        default:
            return state
    }
}

export const useUsersReducer = (handleUpdateLoggedUser: (userData: IUser) => void): IUsersReducer => {
    const [usersState, dispatch] = useReducer<
        IUsersReducerState,
        [action: IUsersReducerActions]
    >(usersReducerActions, initialState)

    const emailIsValid = useValidateEmail()

    const storageUpdatedUserData = (userData: IUser) => {
        const storagedUserData = JSON.parse(localStorage.getItem("etoile-auth")!)

        const newUserData = {
            user: userData,
            token: storagedUserData.token
        }

        localStorage.setItem("etoile-auth", JSON.stringify(newUserData))
    }

    const handleResetUsersMessage = useCallback(() => {
        dispatch({ type: "USERS_RESET_MESSAGES" })
    }, [])

    const handleSetUserToEdit = useCallback((user: IUser | null) => {
        dispatch({ type: "SET_USER_TO_EDIT", payload: user })
    }, [])

    const handleFetchUsers = useCallback(async () => {
        dispatch({ type: "USERS_FETCH_START" })

        const response = await usersServices.fetchUsers()

        if (!response.success) {
            return dispatch({
                type: "USERS_FETCH_FAILURE",
                payload: response.body.text || "Erro ao buscar usuários."
            })
        }

        return dispatch({
            type: "USERS_FETCH_SUCCESS",
            payload: response.body
        })
    }, [])

    const handleCreateUser = useCallback(async (userData: Partial<IUserCreate>, photo: File | null) => {
        dispatch({ type: "USERS_MUTATE_START" })

        if (!userData.fullname) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Preencha o nome."
            })
        }

        if (!userData.email) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Preencha o e-mail."
            })
        }

        if (!emailIsValid(userData.email)) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Endereço de e-mail inválido."
            })
        }

        if (!userData.role) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Selecione o perfil do usuário."
            })
        }

        if (!userData.password) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Preencha a senha."
            })
        }

        if (!userData.confirmPassword) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Confirme a senha."
            })
        }

        if (userData.password !== userData.confirmPassword) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "As senhas digitadas não correspondem."
            })
        }

        delete userData.confirmPassword

        const checkEmail = await usersServices.findUserByEmail(userData.email)

        if (!checkEmail.success) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Erro ao verificar e-mail na base de dados."
            })
        }

        if (checkEmail.body) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Endereço de e-mail já cadastrado."
            })
        }

        const formData = new FormData()
        Object.keys(userData).forEach(key => formData.append(key, userData[key as keyof IUserCreate] as string))

        if (photo) {
            if (!photo.type.includes("png") && !photo.type.includes("jpeg") && !photo.type.includes("jpg")) {
                return dispatch({
                    type: "USERS_MUTATE_FAILURE",
                    payload: "Formato de imagem inválido. Utilize PNG ou JPEG."
                })
            }

            if (photo.size > 5 * 1024 * 1024) {
                return dispatch({
                    type: "USERS_MUTATE_FAILURE",
                    payload: "O tamanho da foto deve ser até 5MB."
                })
            }

            formData.append("photo", photo)
        }

        const response = await usersServices.createUser(formData)

        if (!response.success) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao criar perfil."
            })
        }

        return dispatch({
            type: "USERS_MUTATE_SUCCESS",
            payload: {
                user: response.body,
                message: "Perfil criado com sucesso."
            }
        })
    }, [emailIsValid])

    const handleUpdateUser = useCallback(async (
        userData: Partial<IUserUpdate>,
        userId: string,
        photo?: File | null,
        isAdmin?: boolean,
        userIsAuthenticated?: boolean
    ) => {
        dispatch({ type: "USERS_MUTATE_START" })

        if (!userId || !usersState.currentUser || usersState.currentUser._id !== userId) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Erro inesperado ao atualizar perfil."
            })
        }

        if (!userData.fullname) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Preencha o nome."
            })
        }

        if (userData.changePassword) {
            if (!userData.newPassword) {
                return dispatch({
                    type: "USERS_MUTATE_FAILURE",
                    payload: "Preencha a nova senha."
                })
            }

            if (!userData.confirmPassword) {
                return dispatch({
                    type: "USERS_MUTATE_FAILURE",
                    payload: "Confirme a nova senha."
                })
            }

            if (userData.newPassword !== userData.confirmPassword) {
                return dispatch({
                    type: "USERS_MUTATE_FAILURE",
                    payload: "As senhas digitadas não coincidem."
                })
            }

            if (!isAdmin) {
                if (!userData.password) {
                    return dispatch({
                        type: "USERS_MUTATE_FAILURE",
                        payload: "Preencha a senha."
                    })
                }

                const checkPassword = await authServices.login({
                    email: usersState.currentUser.email,
                    password: userData.password
                })

                if (!checkPassword.success) {
                    return dispatch({
                        type: "USERS_MUTATE_FAILURE",
                        payload: "Senha incorreta."
                    })
                }
            }

            const password = userData.newPassword
            userData.password = password
            delete userData.newPassword
            delete userData.confirmPassword
        }

        delete userData.changePassword

        const formData = new FormData()
        Object.keys(userData).forEach(key => formData.append(key, userData[key as keyof IUserUpdate] as string))

        if (photo) {
            if (!photo.type.includes("png") && !photo.type.includes("jpeg") && !photo.type.includes("jpg")) {
                return dispatch({
                    type: "USERS_MUTATE_FAILURE",
                    payload: "Formato de imagem inválido. Utilize PNG ou JPEG."
                })
            }

            if (photo.size > 5 * 1024 * 1024) {
                return dispatch({
                    type: "USERS_MUTATE_FAILURE",
                    payload: "O tamanho da foto deve ser até 5MB."
                })
            }

            formData.append("photo", photo)
        }

        const response = await usersServices.updateUser(formData, userId)

        if (!response.success) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao atualizar perfil."
            })
        }

        if (!isAdmin || (isAdmin && userIsAuthenticated)) {
            storageUpdatedUserData(response.body)
            handleUpdateLoggedUser(response.body)
        }

        return dispatch({
            type: "USERS_MUTATE_SUCCESS",
            payload: {
                user: response.body,
                message: "Perfil atualizado com sucesso."
            }
        })
    }, [usersState.currentUser, handleUpdateLoggedUser])

    const handleUpdatePhoto = useCallback(async (photo: File | null, userId: string) => {
        dispatch({ type: "USERS_MUTATE_START" })

        if (!userId) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Erro inesperado ao atualizar foto de perfil."
            })
        }

        if (!photo) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Selecione uma foto para atualizar."
            })
        }

        if (!photo.type.includes("png") && !photo.type.includes("jpeg") && !photo.type.includes("jpg")) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "Formato de imagem inválido. Utilize PNG ou JPEG."
            })
        }

        if (photo.size > 5 * 1024 * 1024) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: "O tamanho da foto deve ser até 5MB."
            })
        }

        const formData = new FormData()
        formData.append("photo", photo)

        const response = await usersServices.updateUserPhoto(
            formData,
            userId
        )

        if (!response.success) {
            return dispatch({
                type: "USERS_MUTATE_FAILURE",
                payload: response.body.text || "Erro ao atualizar foto de perfil."
            })
        }

        storageUpdatedUserData(response.body)
        handleUpdateLoggedUser(response.body)

        return dispatch({
            type: "USERS_MUTATE_SUCCESS",
            payload: {
                user: response.body,
                message: "Foto de perfil atualizada com sucesso."
            }
        })
    }, [handleUpdateLoggedUser])

    const handleDeleteUser = useCallback(async (userId: string, userIsAuthenticated: boolean) => {
        dispatch({ type: "USERS_DELETE_START" })

        if (userIsAuthenticated) {
            return dispatch({
                type: "USERS_DELETE_FAILURE",
                payload: "Por segurança, não é permitido deletar o próprio perfil."
            })
        }

        if (!userId) {
            return dispatch({
                type: "USERS_DELETE_FAILURE",
                payload: "Erro inesperado ao excluir usuário."
            })
        }

        const response = await usersServices.deleteUser(userId)

        if (!response.success) {
            return dispatch({
                type: "USERS_DELETE_FAILURE",
                payload: response.body.text || "Erro ao excluir usuário."
            })
        }

        return dispatch({
            type: "USERS_DELETE_SUCCESS",
            payload: {
                userId: response.body._id,
                message: "Usuário excluído com sucesso."
            }
        })
    }, [])

    return {
        ...usersState,
        handleResetUsersMessage,
        handleSetUserToEdit,
        handleFetchUsers,
        handleCreateUser,
        handleUpdateUser,
        handleUpdatePhoto,
        handleDeleteUser,
    }
}