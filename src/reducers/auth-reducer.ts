import { useCallback, useReducer } from "react";
import type { IAuthActions, IAuthState } from "../types/reducer-states";
import type { IUser, IUserRegister } from "../types/user";
import { useValidateEmail } from "../hooks/validate-email";
import authServices from "../services/auth-service";

const storagedAuth = localStorage.getItem("etoile-auth")

const initialState: IAuthState = {
    success: storagedAuth ? true : false,
    loading: false,
    errorMessage: null,
    successMessage: null,
    user: storagedAuth ? JSON.parse(storagedAuth).user as IUser : null,
    token: storagedAuth ? JSON.parse(storagedAuth).token as string : null,
    authFormFields: {
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user"
    }
}

const authReducerActions = (state: IAuthState, action: IAuthActions): IAuthState => {
    switch (action.type) {
        case "AUTH_FORM_FIELDS_CHANGE":
            return {
                ...state,
                errorMessage: null,
                authFormFields: {
                    ...state.authFormFields,
                    [action.payload.name]: action.payload.value
                }
            }

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

        case "AUTH_CLEAR_FORM":
            return {
                ...state,
                loading: false,
                successMessage: null,
                errorMessage: null,
                authFormFields: initialState.authFormFields
            }

        case "AUTH_LOGOUT":
            return {
                ...state,
                success: false,
                user: null,
                token: null
            }

        default:
            return state
    }
}

export const useAuthReducer = () => {
    const [authState, dispatch] = useReducer<
        IAuthState,
        [action: IAuthActions]
    >(authReducerActions, initialState)

    const validateEmail = useValidateEmail()

    const handleChangeAuthForm = useCallback((name: keyof IUserRegister, value: string) => {
        dispatch({ type: "AUTH_FORM_FIELDS_CHANGE", payload: { name, value } })
    }, [])

    const handleClearAuthForm = useCallback(() => {
        dispatch({ type: "AUTH_CLEAR_FORM" })
    }, [])

    const handleLogin = useCallback(async () => {
        dispatch({ type: "AUTH_SUBMIT_START" })

        if (!authState.authFormFields.email) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Digite o seu e-mail."
            })
            return
        }

        if (!validateEmail(authState.authFormFields.email)) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Digite um endereço de e-mail válido."
            })
            return
        }

        if (!authState.authFormFields.password) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Digite a sua senha."
            })
            return
        }

        const response = await authServices.login({
            email: authState.authFormFields.email,
            password: authState.authFormFields.password
        })

        if (!response.success) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: response.body.text ?? "Erro ao realizar login."
            })
            return
        }

        localStorage.setItem("etoile-auth", JSON.stringify({
            user: response.body.user,
            token: response.body.token
        }))

        dispatch({
            type: "AUTH_SUBMIT_SUCCESS",
            payload: {
                message: response.body.text ?? "Login efetuado com sucesso.",
                user: response.body.user,
                token: response.body.token
            }
        })
    }, [authState.authFormFields])

    const handleRegister = useCallback(async () => {
        dispatch({ type: "AUTH_SUBMIT_START" })

        if (!authState.authFormFields.fullname) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Digite o seu nome."
            })
            return
        }

        if (!authState.authFormFields.email) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Digite o seu e-mail."
            })
            return
        }

        if (!validateEmail(authState.authFormFields.email)) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Digite um endereço de e-mail válido."
            })
            return
        }

        if (!authState.authFormFields.password) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Digite a sua senha."
            })
            return
        }

        if (!authState.authFormFields.confirmPassword) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "Confirme a sua senha."
            })
            return
        }

        if (authState.authFormFields.password !== authState.authFormFields.confirmPassword) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: "As senhas digitadas não conferem."
            })
            return
        }

        const response = await authServices.register({
            fullname: authState.authFormFields.fullname,
            email: authState.authFormFields.email,
            password: authState.authFormFields.password,
            role: authState.authFormFields.role
        })

        if (!response.success) {
            dispatch({
                type: "AUTH_SUBMIT_FAILURE",
                payload: response.body.text ?? "Erro ao realizar cadastro."
            })
            return
        }

        localStorage.setItem("etoile-auth", JSON.stringify({
            user: response.body.user,
            token: response.body.token
        }))

        dispatch({
            type: "AUTH_SUBMIT_SUCCESS",
            payload: {
                message: response.body.text ?? "Cadastro efetuado com sucesso.",
                user: response.body.user,
                token: response.body.token
            }
        })
    }, [authState.authFormFields])

    const handleLogout = useCallback(() => {
        localStorage.removeItem("etoile-auth")
        dispatch({ type: "AUTH_LOGOUT" })
    }, [])

    return {
        ...authState,
        handleChangeAuthForm,
        handleClearAuthForm,
        handleLogin,
        handleRegister,
        handleLogout
    }
}