import { useEffect, useReducer, useState } from "react";
import type { IAuthState, IReducerAction } from "../interfaces/reducer-state";
import type { IUser, IUserRegister } from "../interfaces/user";
import { useValidateEmail } from "../hooks/useValidateEmail";
import authService from "../services/auth-service";

const state: IAuthState = {
    success: false,
    loading: false,
    errorMessage: null,
    successMessage: null,
    user: null
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
                ...state,
                success: true,
                loading: false,
                user: action.payload.data,
                successMessage: action.payload.message ?? state.successMessage,
                errorMessage: null
            }

        case "rejected":
            return {
                ...state,
                success: false,
                loading: false,
                errorMessage: action.payload,
                successMessage: null,
                user: null
            }

        default:
            return state
    }
}

export const authReducer = () => {
    const [authState, dispatch] = useReducer<IAuthState, [action: IReducerAction]>(authReducerActions, state)
    const [cancelled, setCancelled] = useState<boolean>(false)
    const validateEmail = useValidateEmail()

    useEffect(() => {
        setCancelled(true)
    }, [authState])

    const register = async (authData: Partial<IUserRegister>) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

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
            dispatch({ status: "rejected", payload: "Erro ao fazer o cadastro." })
            return
        }

        if (res.body.token) {
            localStorage.setItem("etoile-auth", JSON.stringify({
                user: res.body.user,
                token: res.body.token
            }))
        }

        dispatch({
            status: "fulfilled",
            payload: { data: res.body.user }
        })
    }

    const login = async (authData: Partial<IUser>) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

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

        const res = await authService.register(authData)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao fazer o cadastro." })
            return
        }

        if (res.body.token) {
            localStorage.setItem("etoile-auth", JSON.stringify({
                user: res.body.user,
                token: res.body.token
            }))
        }

        dispatch({
            status: "fulfilled",
            payload: { data: res.body.user }
        })
    }

    const logout = () => {
        localStorage.removeItem("etoile-auth")

        dispatch({
            status: "fulfilled",
            payload: { data: null }
        })
    }

    return { authState, register, login, logout }
}