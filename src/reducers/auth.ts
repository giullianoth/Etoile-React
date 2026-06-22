import { useCallback, useReducer } from "react"
import type { IAuthReducer, IAuthReducerActions, IAuthReducerState } from "../types/reducer-states"
import type { IUser, IUserCreate } from "../types/user"
import { useValidateEmail } from "../hooks/validate-email"
import authServices from "../services/auth"

const storagedUserAuth = () => localStorage.getItem("etoile-auth")

const initialState: IAuthReducerState = {
    loading: false,
    successMessage: null,
    errorMessage: null,
    authenticated: storagedUserAuth() ? true : false,
    user: storagedUserAuth() ? JSON.parse(storagedUserAuth()!).user as IUser : null,
    token: storagedUserAuth() ? JSON.parse(storagedUserAuth()!).token as string : null,
}

const authReducerActions = (state: IAuthReducerState, action: IAuthReducerActions): IAuthReducerState => {
    switch (action.type) {
        case "AUTH_START":
            return {
                ...state,
                loading: true,
                successMessage: null,
                errorMessage: null,
            }

        case "AUTH_SUCCESS":
            return {
                ...state,
                loading: false,
                authenticated: true,
                successMessage: action.payload.message,
                errorMessage: null,
                user: action.payload.user,
                token: action.payload.token,
            }

        case "AUTH_FAILURE":
            return {
                ...state,
                loading: false,
                authenticated: false,
                successMessage: null,
                errorMessage: action.payload,
            }

        case "AUTH_UPDATE_USER":
            return {
                ...state,
                user: action.payload,
            }

        case "AUTH_LOGOUT":
            return {
                ...state,
                authenticated: false,
                user: null,
                token: null
            }

        case "AUTH_RESET_MESSAGES":
            return {
                ...state,
                successMessage: null,
                errorMessage: null,
            }

        default:
            return state
    }
}

export const useAuthReducer = (): IAuthReducer => {
    const [authState, dispatch] = useReducer<
        IAuthReducerState,
        [action: IAuthReducerActions]
    >(authReducerActions, initialState)

    const isValidEmail = useValidateEmail()

    const storageUserData = (user: IUser, token: string) => {
        const userAuthData = { user, token }
        localStorage.setItem("etoile-auth", JSON.stringify(userAuthData))
    }

    const handleResetAuthMessages = useCallback(() => {
        dispatch({ type: "AUTH_RESET_MESSAGES" })
    }, [])

    const handleUpdateLoggedUser = useCallback((userData: IUser) => {
        dispatch({ type: "AUTH_UPDATE_USER", payload: userData })
    }, [])

    const handleLogin = useCallback(async (userData: Partial<IUserCreate>, verifyIfIsAdmin: boolean = false) => {
        dispatch({ type: "AUTH_START" })

        if (!userData.email) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: "Preencha o e-mail."
            })
        }

        if (!isValidEmail(userData.email)) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: "E-mail inválido."
            })
        }

        if (!userData.password) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: "Preencha a senha."
            })
        }

        const response = await authServices.login(userData)

        if (!response.success) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: response.body.text || "Erro ao efetuar login."
            })
        }

        if (verifyIfIsAdmin) {
            const isAdmin = response.body.user.role === "admin"

            if (!isAdmin) {
                return dispatch({
                    type: "AUTH_FAILURE",
                    payload: "Você não tem permissão para acesso."
                })
            }
        }

        storageUserData(response.body.user, response.body.token)

        return dispatch({
            type: "AUTH_SUCCESS",
            payload: {
                user: response.body.user,
                token: response.body.token,
                message: response.body.text || "Login efetuado com sucesso."
            }
        })
    }, [isValidEmail])

    const handleSignup = useCallback(async (userData: Partial<IUserCreate>) => {
        dispatch({ type: "AUTH_START" })

        if (!userData.fullname) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: "Preencha o nome."
            })
        }

        if (!userData.email) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: "Preencha o e-mail."
            })
        }

        if (!isValidEmail(userData.email)) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: "E-mail inválido."
            })
        }

        if (!userData.password) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: "Preencha a senha."
            })
        }

        if (!userData.confirmPassword) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: "Confirme a senha."
            })
        }

        if (userData.password !== userData.confirmPassword) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: "As senhas não correspondem."
            })
        }

        userData.role = "user"
        const response = await authServices.signup(userData)

        if (!response.success) {
            return dispatch({
                type: "AUTH_FAILURE",
                payload: response.body.text || "Erro ao efetuar cadastro."
            })
        }

        storageUserData(response.body.user, response.body.token)

        return dispatch({
            type: "AUTH_SUCCESS",
            payload: {
                user: response.body.user,
                token: response.body.token,
                message: response.body.text || "Cadastro realizado com sucesso."
            }
        })
    }, [isValidEmail])

    const handleLogout = useCallback(() => {
        dispatch({ type: "AUTH_LOGOUT" })
        localStorage.removeItem("etoile-auth")
    }, [])

    return {
        ...authState,
        handleResetAuthMessages,
        handleUpdateLoggedUser,
        handleLogin,
        handleSignup,
        handleLogout,
    }
}