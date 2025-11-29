import type { ICartItem } from "./cart";
import type { IPlate } from "./plate";
import type { IAuthState, IOrdersState, IPlatesState } from "./reducer-states";
import type { IUserRegister } from "./user";

interface IMessageContext {
    message: string | null
    messageIsVisible: boolean
    fading: boolean
    addMessage: (text: string) => void
    showMessage: (timeout?: number) => void
}

interface ICartContext {
    cart: ICartItem[]
    addToCart: (cartItem: IPlate) => void
    updateQuantity: (cartItem: IPlate, quantity: number) => void
    removeFromCart: (cartItem: IPlate) => void
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
    cart: ICartContext
    auth: IAuthContext
    orders: IOrdersContext
    plates: IPlatesContext
}