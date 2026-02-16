import type { ICartItem } from "./cart";
import type { IMessageType } from "./message";
import type { IOrder, IOrderCreate, IOrderUpdate } from "./order";
import type { ICategory, IPlate } from "./plate";
import type { IAuthState, IOrdersState, IPlatesState, IUsersState } from "./reducer-states";
import type { IUser, IUserRegister, IUserUpdate } from "./user";

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
    addToCart: (cartItem: IPlate, quantity?: number) => void
    updateQuantity: (plateId: string, quantity: number) => void
    removeFromCart: (cartItem: IPlate) => void
    clearCart: () => void
}

interface IAuthContext extends IAuthState {
    handleChangeAuthForm: (name: keyof IUserRegister, value: string) => void
    handleClearAuthForm: () => void
    handleClearAuthData: () => void
    handleUpdateLoggedUser: (userData: IUser) => void
    handleLogin: (toRestrictedArea?: boolean) => Promise<void>
    handleRegister: () => Promise<void>
    handleLogout: () => void
}

interface IOrdersContext extends IOrdersState {
    handleSetOrderToEdit: (order: IOrder | null) => void
    handleChangeOrderFormFields: (name: keyof IOrderCreate | keyof IOrderUpdate, value: string | boolean | IPlate[]) => void
    handleClearOrdersData: () => void
    handleClearOrderFormFields: () => void
    handleFetchOrders: () => Promise<void>
    handleFetchOrdersByUser: (userId: string) => Promise<void>
    handleCreateOrder: (orderItems: IOrderCreate["items"], orderDate: Date | null, userId?: string) => Promise<void>
    handleUpdateOrder: (orderDate: Date | null) => Promise<void>
    handleCancelOrderItem: (orderItemId: string) => Promise<void>
    handleCancelOrder: (orderId: string) => Promise<void>
    handleDeleteOrder: (orderId: string) => Promise<void>
}

interface IPlatesContext extends IPlatesState {
    handleChangeCategoryFormFields: (name: keyof ICategory, value: string) => void
    handleChangePlateFormFields: (name: keyof IPlate, value: string | boolean) => void
    handleClearPlatesData: () => void
    handleClearCategoryFormFields: () => void
    handleClearPlateFormFields: () => void
    handleSetCategoryToEdit: (category: ICategory | null) => void
    handleSetPlateToEdit: (plate: IPlate | null) => void
    handleFetchCategories: () => Promise<void>
    handleFetchAvailableCategories: () => Promise<void>
    handleFetchPlates: () => Promise<void>
    handleFetchAvailablePlates: () => Promise<void>
    handleCreateCategory:() => Promise<void>
    handleUpdateCategory: (categoryId: string) => Promise<void>
    handleDeleteCategory:(categoryId: string) => Promise<void>
}

interface IUsersContext extends IUsersState {
    handleChangeUsersUpdateFormFields: (name: keyof IUserUpdate, value: string | boolean) => void
    handleClearUsersFormFields: () => void
    handleClearUsersData: () => void
    handleSetUserToEdit: (userData: IUser | null) => void
    handleUpdateUser: () => Promise<void>
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