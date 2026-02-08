import type { IOrder, IOrderCreate, IOrderItem, IOrderUpdate } from "./order"
import type { ICategory, IPlate } from "./plate"
import type { IUser, IUserRegister, IUserUpdate } from "./user"

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
    | { type: "AUTH_CLEAR_DATA" }
    | { type: "AUTH_UPDATE_USER", payload: IUser }
    | { type: "AUTH_SUBMIT_START" }
    | { type: "AUTH_SUBMIT_SUCCESS", payload: { user: IUser, token: string, message: string } }
    | { type: "AUTH_SUBMIT_FAILURE", payload: string }
    | { type: "AUTH_LOGOUT" }

// Orders
export interface IOrdersState extends IReducerStates {
    orders: IOrder[]
    currentOrder: IOrder | null
    orderFormFields: Partial<IOrderCreate & IOrderUpdate>
    fetching: boolean
    cancellingOrderItem: boolean
    fetchErrorMessage: string | null
}

export type IOrdersActions =
    | { type: "ORDERS_FETCH_START" }
    | { type: "ORDERS_FETCH_SUCCESS", payload: IOrder[] }
    | { type: "ORDERS_FETCH_FAILURE", payload: string }
    | { type: "ORDERS_CHANGE_FORM_FIELDS", payload: { name: keyof IOrderCreate | keyof IOrderUpdate, value: string | boolean | IPlate[] } }
    | { type: "ORDERS_CREATE_START" }
    | { type: "ORDERS_CREATE_SUCCESS", payload: { order: IOrder, message: string } }
    | { type: "ORDERS_CREATE_FAILURE", payload: string }
    | { type: "SET_ORDER_TO_EDIT", payload: IOrder | null }
    | { type: "ORDERS_UPDATE_START" }
    | { type: "ORDERS_CANCEL_ITEM_START" }
    | { type: "ORDERS_UPDATE_SUCCESS", payload: { orderResult: IOrder, message: string } }
    | { type: "ORDERS_CANCEL_ITEM_SUCCESS", payload: { orderResult: IOrderItem, message: string } }
    | { type: "ORDERS_UPDATE_FAILURE", payload: string }
    | { type: "ORDERS_CANCEL_ITEM_FAILURE", payload: string }
    | { type: "ORDERS_CLEAR_FORM_FIELDS" }
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

// Users
export interface IUsersState extends IReducerStates {
    currentUser: IUser | null
    userUpdateFormFields: Partial<IUserUpdate>
}

export type IUsersActions =
    | { type: "USERS_UPDATE_CHANGE_FORM_FIELDS", payload: { name: keyof IUserUpdate, value: string | boolean } }
    | { type: "SET_USER_TO_EDIT", payload: IUser | null }
    | { type: "USERS_UPDATE_START" }
    | { type: "USERS_UPDATE_SUCCESS", payload: string }
    | { type: "USERS_UPDATE_FAILURE", payload: string }
    | { type: "USERS_CLEAR_FORM_FIELDS" }
    | { type: "USERS_CLEAR_DATA" }