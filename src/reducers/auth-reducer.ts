import { useCallback, useReducer } from "react";
import type { IAuthActions, IAuthState } from "../types/reducer-states";
import type { IUser, IUserRegister } from "../types/user";
import { useValidateEmail } from "../hooks/validate-email";
import type { IAuthContext } from "../types/context";
import authServices from "../services/auth-service";

const storagedAuth = () => localStorage.getItem("etoile-auth")

const initialState: IAuthState = {
    success: storagedAuth() ? true : false,
    loading: false,
    errorMessage: null,
    successMessage: null,
    user: storagedAuth() ? JSON.parse(storagedAuth()!).user as IUser : null,
    token: storagedAuth() ? JSON.parse(storagedAuth()!).token as string : null,
}

const authReducerActions = (state: IAuthState, action: IAuthActions): IAuthState => {
    switch (action.type) {

        case "AUTH_SUBMIT_START":
            return {
                ...state,
                loading: true,
                success: false,
                successMessage: null,
                errorMessage: null
            }

        case "AUTH_SUBMIT_SUCCESS":
            return {
                ...state,
                loading: false,
                success: true,
                successMessage: action.payload.message,
                errorMessage: null,
                user: action.payload.user,
                token: action.payload.token
            }

        case "AUTH_SUBMIT_FAILURE":
            return {
                ...state,
                loading: false,
                success: false,
                successMessage: null,
                errorMessage: action.payload
            }

        case "AUTH_UPDATE_USER":
            return {
                ...state,
                user: action.payload
            }

        case "AUTH_LOGOUT":
            return {
                ...state,
                success: false,
                user: null,
                token: null
            }

        case "AUTH_RESET":
            return initialState

        default:
            return state
    }
}

export const useAuthReducer = (): IAuthContext => {
    const [authState, dispatch] = useReducer<
        IAuthState,
        [action: IAuthActions]
    >(authReducerActions, initialState)

    const validateEmail = useValidateEmail()

    const handleReset = useCallback(() => {
        dispatch({ type: "AUTH_RESET" })
    }, [])

    const handleUpdateLoggedUser = useCallback((userData: IUser) => {
        dispatch({
            type: "AUTH_UPDATE_USER",
            payload: userData
        })
    }, [])

    const handleLogin = useCallback(async (userData: Partial<IUser>) => {
        dispatch({ type: "AUTH_SUBMIT_START" })

        if (!userData.email) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Preencha o e-mail"
            })
            return
        }

        if (!userData.password) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Preencha a senha"
            })
            return
        }

        if (!validateEmail(userData.email)) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Formato de e-mail inválido"
            })
            return
        }

        const response = await authServices.login(userData)

        if (!response.success) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: response.body.text || "Erro ao realizar login."
            })
            return
        }

        const { text, token, user } = response.body
        localStorage.setItem("etoile-auth", JSON.stringify({ user, token }))

        dispatch({
            type: "AUTH_SUBMIT_SUCCESS",
            payload: { user, token, message: text }
        })
    }, [validateEmail])

    const handleRegister = useCallback(async (userData: Partial<IUserRegister>) => {
        dispatch({ type: "AUTH_SUBMIT_START" })

        if (!userData.fullname) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Preencha o nome"
            })
            return
        }

        if (!userData.email) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Preencha o e-mail"
            })
            return
        }

        if (!userData.password) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Preencha a senha"
            })
            return
        }

        if (!userData.confirmPassword) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Confirme a senha"
            })
            return
        }

        if (!validateEmail(userData.email)) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Formato de e-mail inválido"
            })
            return
        }

        if (userData.password !== userData.confirmPassword) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "As senhas não conferem"
            })
            return
        }

        userData.role = "user"
        const response = await authServices.register(userData)

        if (!response.success) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: response.body.text || "Erro ao realizar cadastro."
            })
            return
        }

        const { text, token, user } = response.body
        localStorage.setItem("etoile-auth", JSON.stringify({ user, token }))

        dispatch({
            type: "AUTH_SUBMIT_SUCCESS",
            payload: { user, token, message: text }
        })
    }, [validateEmail])

    const handleLogout = useCallback(() => {
        localStorage.removeItem("etoile-auth")
        dispatch({ type: "AUTH_LOGOUT" })
    }, [])

    return {
        ...authState,
        handleReset,
        handleUpdateLoggedUser,
        handleLogin,
        handleRegister,
        handleLogout
    }
}