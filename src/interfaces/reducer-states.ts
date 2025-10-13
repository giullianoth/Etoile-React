import type { IUser } from "./user"

interface IReducerState {
    success: boolean
    loading: boolean
    refetch?: boolean
    errorMessage?: string | null
    successMessage?: string | null
}

export interface IReducerAction {
    status: "pending" | "rejected" | "fulfilled" | "reset"
    message?: string | null
    data?: any
}

export interface IAuthReducerState extends IReducerState {
    user: Partial<IUser> | null
}