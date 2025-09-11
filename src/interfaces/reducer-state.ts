import type { ICategory } from "./category"
import type { IOrder } from "./order"
import type { IPlate } from "./plate"
import type { IUser } from "./user"

interface IReducerState {
    success: boolean
    loading: boolean
    errorMessage: string | null
    successMessage: string | null
}

export interface IReducerAction {
    status: "pending" | "fulfilled" | "rejected" | "reset"
    payload?: any
}

export interface IMessageState {
    message: string | null
    isVisible: boolean
}

export interface ICategoryState extends IReducerState {
    categories: ICategory[]
    category: ICategory | null
}

export interface IPlateState extends IReducerState {
    plates: IPlate[]
    plate: IPlate | null
}

export interface IOrderState extends IReducerState {
    orders: IOrder[]
    order: IOrder | null
}

export interface IAuthState extends IReducerState {
    user: Partial<IUser> | null
}

export interface IUserState extends IReducerState {
    users: IUser[]
}