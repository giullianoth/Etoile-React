import type { ICategory } from "./category"
import type { IPlate } from "./plate"

export interface IReducerInitialState {
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