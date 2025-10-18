import type { IAuthReducerState, ICategoriesReducerState, IOrderReducerState, IPlatesReducerState } from "./reducer-states"
import type { IUser, IUserRegister } from "./user"

export interface IContext {
    auth: {
        authState: IAuthReducerState
        login: (userData: Partial<IUser>) => Promise<void>
        logout: () => void
        register: (userData: Partial<IUserRegister>) => Promise<void>
    }

    orders: {
        ordersState: IOrderReducerState
        refetch: boolean
        getOrdersByUser: (userId: string) => Promise<void>
    }

    plates: {
        platesState: IPlatesReducerState
        refetch: boolean
        getAvailablePlates: () => Promise<void>
    }

    categories: {
        categoriesState: ICategoriesReducerState
        refetch: boolean
        getAvailableCategories: () => Promise<void>
    }
}