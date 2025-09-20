import { useEffect, useReducer } from "react"
import type { IReducerAction, IReducerState } from "../interfaces/reducer-states"
import authServices from "../services/auth"
import type { IUser, IUserRegister } from "../interfaces/user"
import { useValidateEmail } from "../hooks/useValidateEmail"

const initialState: IReducerState = {
    success: false,
    loading: false,
    successMessage: null,
    errorMessage: null
}

const authReducerActions = (state: IReducerState, action: IReducerAction) => {
    switch (action.status) {
        case "pending":
            return {
                ...state,
                success: false,
                loading: true
            }

        case "rejected":
            return {
                ...state,
                success: false,
                loading: false,
                errorMessage: action.message,
                successMessage: null
            }

        case "fulfilled":
            return {
                ...state,
                success: true,
                loading: false,
                successMessage: action.message,
                errorMessage: null
            }

        case "reset":
            return initialState

        default:
            return state
    }
}

export const useAuthReducer = () => {
    const [authState, dispatch] = useReducer<IReducerState, [action: IReducerAction]>(authReducerActions, initialState)
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
            message: res.body.text ?? "Login efetuado com sucesso."
        })
    }

    const logout = () => {

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
            message: res.body.text ?? "Cadastro realizado com sucesso."
        })
    }

    return { authState, login, logout, register }
}