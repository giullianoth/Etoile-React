import type { ICategory } from "./category"
import type { IOrder } from "./order"
import type { IPlate } from "./plate"
import type { IUser } from "./user"

interface IReducerInitialState {
    success: boolean
    loading: boolean
    errorMessage: string | null
    successMessage: string | null
}

export interface IReducerAction {
    status: "pending" | "fulfilled" | "rejected"
    payload?: any
}

export interface ICategoryState extends IReducerInitialState {
    categories: ICategory[]
    category: ICategory | null
}

export interface IPlateState extends IReducerInitialState {
    plates: IPlate[]
    plate: IPlate | null
}

export interface IOrderState extends IReducerInitialState {
    orders: IOrder[]
    order: IOrder | null
}

export interface IAuthState extends IReducerInitialState {
    user: Partial<IUser> | null
}

export interface IUserState extends IReducerInitialState {
    users: IUser[]
}