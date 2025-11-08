import { useCallback, useReducer } from "react"
import type { IAuthAction, IAuthState } from "../types/reducer-states"
import { useValidateEmail } from "../hooks/useValidateEmail"
import type { IUser, IUserRegister } from "../types/user"
import authServices from "../services/auth-service"

const storagedData = () => localStorage.getItem("etoile_auth")

const initialState: IAuthState = {
    loading: false,
    authenticated: storagedData() ? true : false,
    errorMessage: null,
    successMessage: null,
    user: storagedData() ? JSON.parse(storagedData()!).user : null,
    token: storagedData() ? JSON.parse(storagedData()!).token : null,
    registerFormFields: {
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    },
    loginFormFields: {
        email: "",
        password: ""
    }
}

const authActions = (state: IAuthState, action: IAuthAction): IAuthState => {
    switch (action.type) {
        case "AUTH_LOGIN_FORM_FIELDS_CHANGE":
            return {
                ...state,
                errorMessage: null,
                loginFormFields: {
                    ...state.loginFormFields,
                    [action.payload.name]: action.payload.value
                }
            }

        case "AUTH_REGISTER_FORM_FIELDS_CHANGE":
            return {
                ...state,
                errorMessage: null,
                registerFormFields: {
                    ...state.registerFormFields,
                    [action.payload.name]: action.payload.value
                }
            }

        case "AUTH_START":
            return {
                ...state,
                loading: true,
                successMessage: null,
                errorMessage: null
            }

        case "AUTH_SUCCESS":
            localStorage.setItem("etoile_auth", JSON.stringify({
                user: action.payload.user,
                token: action.payload.token
            }))

            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                errorMessage: null,
                user: action.payload.user,
                token: action.payload.token,
                authenticated: true
            }

        case "AUTH_FAILURE":
            return {
                ...state,
                loading: false,
                successMessage: null,
                errorMessage: action.payload,
                authenticated: false
            }

        case "AUTH_LOGOUT":
            localStorage.removeItem("etoile_auth")

            return {
                ...state,
                user: null,
                token: null,
                authenticated: false,
                loginFormFields: initialState.loginFormFields,
                registerFormFields: initialState.registerFormFields
            }

        case "AUTH_CLEAR_FORM":
            return initialState

        default:
            return state
    }
}

const useAuthReducer = () => {
    const [authState, dispatch] = useReducer<IAuthState, [action: IAuthAction]>(authActions, initialState)
    const validateEmail = useValidateEmail()

    const changeLoginFormFields = useCallback((name: keyof IUser, value: string) => {
        dispatch({ type: "AUTH_LOGIN_FORM_FIELDS_CHANGE", payload: { name, value } })
    }, [])

    const changeRegisterFormFields = useCallback((name: keyof IUserRegister, value: string) => {
        dispatch({ type: "AUTH_REGISTER_FORM_FIELDS_CHANGE", payload: { name, value } })
    }, [])

    const clearForm = useCallback(() => {
        dispatch({ type: "AUTH_CLEAR_FORM" })
    }, [])

    const register = useCallback(async () => {
        dispatch({ type: "AUTH_START" })

        if (!authState.registerFormFields.fullname) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: "Digite o seu nome."
            })
            return
        }

        if (!authState.registerFormFields.email) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: "Digite o seu e-mail."
            })
            return
        }

        if (!validateEmail(authState.registerFormFields.email)) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: "Digite um e-mail válido."
            })
            return
        }

        if (!authState.registerFormFields.password) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: "Digite a sua senha."
            })
            return
        }

        if (!authState.registerFormFields.confirmPassword) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: "Confirme a sua senha."
            })
            return
        }

        if (authState.registerFormFields.password !== authState.registerFormFields.confirmPassword) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: "As senhas digitadas não correspondem."
            })
            return
        }

        const { confirmPassword, ...registerFormFieldsRest } = authState.registerFormFields

        registerFormFieldsRest.role = "user"

        const response = await authServices.register(registerFormFieldsRest)

        if (!response.success) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: response.body.text ?? "Erro ao realizar o cadastro."
            })
            return
        }

        dispatch({
            type: "AUTH_SUCCESS",
            payload: {
                user: response.body.user,
                token: response.body.token,
                message: response.body.text
            }
        })
    }, [authState.registerFormFields])

    const login = useCallback(async () => {
        dispatch({ type: "AUTH_START" })

        if (!authState.loginFormFields.email) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: "Digite o seu e-mail."
            })
            return
        }

        if (!validateEmail(authState.loginFormFields.email)) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: "Digite um e-mail válido."
            })
            return
        }

        if (!authState.loginFormFields.password) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: "Digite a sua senha."
            })
            return
        }

        const response = await authServices.login(authState.loginFormFields)

        if (!response.success) {
            dispatch({
                type: "AUTH_FAILURE",
                payload: response.body.text ?? "Erro ao realizar o login."
            })
            return
        }

        dispatch({
            type: "AUTH_SUCCESS",
            payload: {
                user: response.body.user,
                token: response.body.token,
                message: response.body.text
            }
        })
    }, [authState.loginFormFields])

    const logout = useCallback(() => {
        dispatch({ type: "AUTH_LOGOUT" })
    }, [])

    return { ...authState, changeLoginFormFields, changeRegisterFormFields, clearForm, register, login, logout }
}

export default useAuthReducer