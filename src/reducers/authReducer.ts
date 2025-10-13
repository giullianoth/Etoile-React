import { useEffect, useReducer } from "react"
import type { IAuthReducerState, IReducerAction } from "../interfaces/reducer-states"
import authServices from "../services/auth"
import type { IUser, IUserRegister } from "../interfaces/user"
import { useValidateEmail } from "../hooks/useValidateEmail"

const storagedAuth = () => localStorage.getItem("etoile-auth")

const initialState: IAuthReducerState = {
    success: false,
    loading: false,
    successMessage: null,
    errorMessage: null,
    user: storagedAuth() ? JSON.parse(storagedAuth()!).user : null
}

const authReducerActions = (state: IAuthReducerState, action: IReducerAction) => {
    switch (action.status) {
        case "pending":
            return {
                ...state,
                success: false,
                loading: true
            }

        case "rejected":
            return {
                success: false,
                loading: false,
                successMessage: null,
                errorMessage: action.message,
                user: null
            }

        case "fulfilled":
            return {
                success: true,
                loading: false,
                successMessage: action.message,
                errorMessage: null,
                user: action.data
            }

        case "reset":
            return initialState

        default:
            return state
    }
}

export const useAuthReducer = () => {
    const [authState, dispatch] = useReducer<IAuthReducerState, [action: IReducerAction]>(authReducerActions, initialState)
    const validateEmail = useValidateEmail()

    useEffect(() => {
        dispatch({ status: "reset" })
    }, [])

    const login = async (userData: Partial<IUser>) => {
        dispatch({ status: "pending" })

        if (!userData.email) {
            dispatch({
                status: "rejected",
                message: "Digite o e-mail."
            })
            return
        }

        if (!userData.password) {
            dispatch({
                status: "rejected",
                message: "Digite a senha."
            })
            return
        }

        if (!validateEmail(userData.email)) {
            dispatch({
                status: "rejected",
                message: "E-mail inválido."
            })
            return
        }

        const res = await authServices.login(userData)

        if (!res.success) {
            dispatch({
                status: "rejected",
                message: res.body.text ?? "Erro ao realizar o login."
            })
            return
        }

        if (!res.body.token) {
            dispatch({
                status: "rejected",
                message: "Acesso negado."
            })
            return
        }

        localStorage.setItem("etoile-auth", JSON.stringify({
            token: res.body.token,
            user: res.body.user
        }))

        dispatch({
            status: "fulfilled",
            message: res.body.text ?? "Login efetuado com sucesso.",
            data: res.body.user
        })
    }

    const logout = () => {
        localStorage.removeItem("etoile-auth")
        dispatch({ status: "reset" })
    }

    const register = async (userData: Partial<IUserRegister>) => {
        dispatch({ status: "pending" })

        if (!userData.fullname) {
            dispatch({
                status: "rejected",
                message: "Digite o nome."
            })
            return
        }

        if (!userData.email) {
            dispatch({
                status: "rejected",
                message: "Digite o e-mail."
            })
            return
        }

        if (!userData.password) {
            dispatch({
                status: "rejected",
                message: "Digite a senha."
            })
            return
        }

        if (!userData.confirmPassword) {
            dispatch({
                status: "rejected",
                message: "Confirme a senha."
            })
            return
        }

        if (!validateEmail(userData.email)) {
            dispatch({
                status: "rejected",
                message: "E-mail inválido."
            })
            return
        }

        if (userData.password !== userData.confirmPassword) {
            dispatch({
                status: "rejected",
                message: "As senhas digitadas não correspondem."
            })
            return
        }

        const res = await authServices.register(userData)

        if (!res.success) {
            dispatch({
                status: "rejected",
                message: res.body.text ?? "Erro ao realizar o cadastro."
            })
            return
        }

        if (!res.body.token) {
            dispatch({
                status: "rejected",
                message: "Acesso negado."
            })
            return
        }

        localStorage.setItem("etoile-auth", JSON.stringify({
            token: res.body.token,
            user: res.body.user
        }))

        dispatch({
            status: "fulfilled",
            message: res.body.text ?? "Cadastro realizado com sucesso.",
            data: res.body.user
        })
    }

    return { authState, login, logout, register }
}