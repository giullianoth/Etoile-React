import type { IUser, IUserRegister } from "./user"

export interface IAuthState {
    loading: boolean
    authenticated: boolean
    loginFormFields: Partial<IUser>
    registerFormFields: Partial<IUserRegister>
    errorMessage: string | null
    successMessage: string | null
    user: IUser | null
    token: string | null
}

export type IAuthAction =
    | { type: "AUTH_LOGIN_FORM_FIELDS_CHANGE", payload: { name: keyof IUser, value: string } }
    | { type: "AUTH_REGISTER_FORM_FIELDS_CHANGE", payload: { name: keyof IUserRegister, value: string } }
    | { type: "AUTH_START" }
    | { type: "AUTH_SUCCESS", payload: { user: IUser, token: string, message: string } }
    | { type: "AUTH_FAILURE", payload: string }
    | { type: "AUTH_CLEAR_FORM" }
    | { type: "AUTH_LOGOUT" }