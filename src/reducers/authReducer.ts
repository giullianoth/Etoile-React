import { useEffect, useReducer, useState } from "react";
import type { IAuthState, IReducerAction } from "../interfaces/reducer-state";
import type { IUser, IUserRegister } from "../interfaces/user";
import { useValidateEmail } from "../hooks/useValidateEmail";
import authService from "../services/auth-service";

const storagedUser = localStorage.getItem("etoile-auth")

const initialState: IAuthState = {
    success: false,
    loading: false,
    errorMessage: null,
    successMessage: null,
    user: storagedUser ? JSON.parse(storagedUser).user : null
}

const authReducerActions = (state: IAuthState, action: IReducerAction) => {
    switch (action.status) {
        case "pending":
            return {
                ...state,
                success: false,
                loading: true
            }

        case "fulfilled":
            return {
                success: true,
                loading: false,
                user: action.payload.data,
                successMessage: action.payload.message ?? state.successMessage,
                errorMessage: null
            }

        case "rejected":
            return {
                success: false,
                loading: false,
                errorMessage: action.payload,
                successMessage: null,
                user: null
            }

        case "reset":
            return initialState

        default:
            return state
    }
}

export const authReducer = () => {
    const [authState, dispatch] = useReducer<IAuthState, [action: IReducerAction]>(authReducerActions, initialState)
    const [cancelled, setCancelled] = useState<boolean>(false)
    const validateEmail = useValidateEmail()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const resetState = () => dispatch({ status: "reset" })

    const register = async (authData: Partial<IUserRegister>) => {
        checkIfIsCancelled()

        dispatch({ status: "pending" })

        if (!authData.fullname) {
            dispatch({ status: "rejected", payload: "Digite o nome." })
            return
        }

        if (!authData.email) {
            dispatch({ status: "rejected", payload: "Digite o e-mail." })
            return
        }

        if (!authData.password) {
            dispatch({ status: "rejected", payload: "Digite a senha." })
            return
        }

        if (!authData.confirmPassword) {
            dispatch({ status: "rejected", payload: "Confirme a sua senha." })
            return
        }

        if (!validateEmail(authData.email)) {
            dispatch({ status: "rejected", payload: "Digite um endereço de e-mail válido." })
            return
        }

        if (authData.password !== authData.confirmPassword) {
            dispatch({ status: "rejected", payload: "As senhas digitadas não conferem." })
            return
        }

        const res = await authService.register(authData)

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao fazer o cadastro, tente novamente mais tarde."
            })

            return
        }

        if (res.body.token) {
            localStorage.setItem("etoile-auth", JSON.stringify({
                user: res.body.user,
                token: res.body.token
            }))
        } else {
            dispatch({ status: "rejected", payload: "Acesso negado." })
            return
        }

        dispatch({
            status: "fulfilled",
            payload: {
                data: res.body.user,
                message: "Cadastro realizado com sucesso."
            }
        })
    }

    const login = async (authData: Partial<IUser>) => {
        checkIfIsCancelled()

        dispatch({ status: "pending" })

        if (!authData.email) {
            dispatch({ status: "rejected", payload: "Digite o e-mail." })
            return
        }

        if (!authData.password) {
            dispatch({ status: "rejected", payload: "Digite a senha." })
            return
        }

        if (!validateEmail(authData.email)) {
            dispatch({ status: "rejected", payload: "Digite um endereço de e-mail válido." })
            return
        }

        const res = await authService.login(authData)

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao fazer o login, tente novamente mais tarde."
            })

            return
        }

        if (res.body.token) {
            localStorage.setItem("etoile-auth", JSON.stringify({
                user: res.body.user,
                token: res.body.token
            }))
        } else {
            dispatch({ status: "rejected", payload: "Acesso negado." })
            return
        }

        dispatch({
            status: "fulfilled",
            payload: {
                data: res.body.user,
                message: "Login efetuado com sucesso."
            }
        })
    }

    const logout = () => {
        localStorage.removeItem("etoile-auth")

        dispatch({
            status: "fulfilled",
            payload: { data: null }
        })
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { authState, resetState, register, login, logout }
}