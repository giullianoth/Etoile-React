import type { IAuthState, IOrdersState, IPlatesState } from "./reducer-states";
import type { IUserRegister } from "./user";

interface IMessageContext {
    message: string | null
    messageIsVisible: boolean
    fading: boolean
    addMessage: (text: string) => void
    showMessage: (timeout?: number) => void
}

interface IAuthContext extends IAuthState {
    handleChangeAuthForm: (name: keyof IUserRegister, value: string) => void
    handleClearAuthForm: () => void
    handleLogin: () => Promise<void>
    handleRegister: () => Promise<void>
    handleLogout: () => void
}

interface IOrdersContext extends IOrdersState {
    handleClearOrdersData: () => void
    handleFetchOrders: () => Promise<void>
    handleFetchOrdersByUser: (userId: string) => Promise<void>
}

interface IPlatesContext extends IPlatesState {
    handleClearPlatesData: () => void
    handleFetchCategories: () => Promise<void>
    handleFetchAvailableCategories: () => Promise<void>
    handleFetchPlates: () => Promise<void>
    handleFetchAvailablePlates: () => Promise<void>
}

export interface IContext {
    message: IMessageContext
    auth: IAuthContext
    orders: IOrdersContext
    plates: IPlatesContext
}