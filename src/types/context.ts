import type { ICartItem } from "./cart";
import type { IMessageType } from "./message";
import type { IOrderCreate } from "./order";
import type { IPlate } from "./plate";
import type { IAuthState, IOrdersState, IPlatesState } from "./reducer-states";
import type { IUserRegister } from "./user";

interface IMessageContext {
    message: string | null
    messageType: IMessageType
    messageIsVisible: boolean
    fading: boolean
    addMessage: (text: string, type?: IMessageType) => void
    showMessage: (timeout?: number) => void
}

interface ICartContext {
    cart: ICartItem[]
    addToCart: (cartItem: IPlate) => void
    updateQuantity: (cartItem: IPlate, quantity: number) => void
    removeFromCart: (cartItem: IPlate) => void
    clearCart: () => void
}

interface IAuthContext extends IAuthState {
    handleChangeAuthForm: (name: keyof IUserRegister, value: string) => void
    handleClearAuthForm: () => void
    handleLogin: () => Promise<void>
    handleRegister: () => Promise<void>
    handleLogout: () => void
}

interface IOrdersContext extends IOrdersState {
    handleChangeOrderFormFields: (name: keyof IOrderCreate, value: string | IPlate[]) => void
    handleClearOrdersData: () => void
    handleClearOrderFormFields: () => void
    handleFetchOrders: () => Promise<void>
    handleFetchOrdersByUser: (userId: string) => Promise<void>
    handleCreateOrder: (orderItems: IOrderCreate["items"], orderDate: Date | null, userId?: string) => Promise<void>
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