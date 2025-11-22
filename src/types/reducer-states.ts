import type { IUser, IUserRegister } from "./user"

interface IReducerStates {
    loading: boolean
    success: boolean
    successMessage: string | null
    errorMessage: string | null
}

// Auth
export interface IAuthState extends IReducerStates {
    authFormFields: Partial<IUserRegister>
    user: IUser | null
    token: string | null
}

export type IAuthActions =
    | { type: "AUTH_FORM_FIELDS_CHANGE", payload: { name: keyof IUserRegister, value: string } }
    | { type: "AUTH_CLEAR_FORM" }
    | { type: "AUTH_SUBMIT_START" }
    | { type: "AUTH_SUBMIT_SUCCESS", payload: { user: IUser, token: string, message: string } }
    | { type: "AUTH_SUBMIT_FAILURE", payload: string }
    | { type: "AUTH_LOGOUT" }