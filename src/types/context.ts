import type { ICartItem } from "./cart";
import type { IMessageType } from "./message";
import type { IOrder, IOrderCreate, IOrderUpdate } from "./order";
import type { IPlate } from "./plate";
import type { IAuthState, IOrdersState, IPlatesState, IUsersState } from "./reducer-states";
import type { IUser, IUserRegister, IUserUpdate } from "./user";

export interface IMessageContext {
    message: string | null
    messageType: IMessageType
    messageIsVisible: boolean
    fading: boolean
    addMessage: (text: string, type?: IMessageType) => void
    showMessage: (timeout?: number) => void
}

export interface ICartContext {
    cart: ICartItem[]
    addToCart: (cartItem: IPlate, quantity?: number) => void
    updateQuantity: (plateId: string, quantity: number) => void
    removeFromCart: (cartItem: IPlate) => void
    clearCart: () => void
}

export interface IAuthContext extends IAuthState {
    handleReset: () => void
    handleUpdateLoggedUser: (userData: IUser) => void
    handleLogin: (userData: Partial<IUser>) => Promise<void>
    handleRegister: (userData: Partial<IUserRegister>) => Promise<void>
    handleLogout: () => void
}

export interface IOrdersContext extends IOrdersState {
    handleSetOrderToEdit: (order: IOrder | null) => void
    handleResetOrdersMessage: () => void
    handleResetOrders: () => void
    handleFetchOrdersByUser: (userId: string) => Promise<void>
    handleCreateOrder: (orderItems: IOrderCreate["items"], orderDate: Date, orderTime: string, userId: string) => Promise<void>
    handleUpdateOrder: (orderId: string, orderData: Partial<IOrderUpdate>) => Promise<void>
    handleCancelOrderItem: (orderItemId: string) => Promise<void>
    handleCancelOrder: (orderId: string) => Promise<void>
}

export interface IPlatesContext extends IPlatesState {
    handleFetchCategories: () => Promise<void>
    handleFetchAvailableCategories: () => Promise<void>
    handleFetchPlates: () => Promise<void>
    handleFetchAvailablePlates: () => Promise<void>
    handleFetchAvailablePlatesByCategory: (categoryId: string) => Promise<void>
    handleCreateCategory: () => Promise<void>
    handleUpdateCategory: (categoryId: string) => Promise<void>
    handleUpdatePlate: (plateId: string, image?: File | null) => Promise<void>
    handleDeleteCategory: (categoryId: string) => Promise<void>
}

export interface IUsersContext extends IUsersState {
    handleResetUsers: () => void
    handleSetUserToEdit: (userData: IUser | null) => void
    handleUpdateUser: (userData: Partial<IUserUpdate>) => Promise<void>
    handleUpdateUserPhoto: (photo: File) => Promise<void>
}

export interface IContext {
    message: IMessageContext
    cart: ICartContext
    auth: IAuthContext
    orders: IOrdersContext
    plates: IPlatesContext
    users: IUsersContext
}