import type { IOrder } from "./order"
import type { IUser } from "./user"

interface IReducerState {
    success: boolean
    loading: boolean
    errorMessage?: string | null
    successMessage?: string | null
}

export interface IReducerAction {
    status: "pending" | "rejected" | "fulfilled" | "reset"
    message?: string | null
    payload?: { list: any, data: any } | any
}

export interface IAuthReducerState extends IReducerState {
    user: Partial<IUser> | null
}

export interface IOrderReducerState extends IReducerState {
    orders: IOrder[]
    order: IOrder | null
}