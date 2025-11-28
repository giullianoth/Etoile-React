import type { IOrder } from "./order"
import type { ICategory, IPlate } from "./plate"
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

// Orders
export interface IOrdersState extends IReducerStates {
    orders: IOrder[]
}

export type IOrdersActions =
    | { type: "ORDERS_FETCH_START" }
    | { type: "ORDERS_FETCH_SUCCESS", payload: IOrder[] }
    | { type: "ORDERS_FETCH_FAILURE", payload: string }
    | { type: "ORDERS_CLEAR_DATA" }

// Plates & Categories
export interface IPlatesState extends IReducerStates {
    categories: ICategory[]
    plates: IPlate[]
}

export type IPlatesActions =
    | { type: "CATEGORIES_FETCH_START" }
    | { type: "CATEGORIES_FETCH_SUCCESS", payload: ICategory[] }
    | { type: "CATEGORIES_FETCH_FAILURE", payload: string }
    | { type: "PLATES_FETCH_START" }
    | { type: "PLATES_FETCH_SUCCESS", payload: IPlate[] }
    | { type: "PLATES_FETCH_FAILURE", payload: string }
    | { type: "PLATES_CLEAR_DATA" }