import type { IOrder, IOrderCreate, IOrderItem, IOrderUpdate } from "./order"
import type { ICategory, IPlate } from "./plate"
import type { IUser, IUserCreate, IUserUpdate } from "./user"

// AUTH
export interface IAuthReducerState {
    loading: boolean
    successMessage: string | null
    errorMessage: string | null
    authenticated: boolean
    user: IUser | null
    token: string | null
}

export type IAuthReducerActions =
    | { type: "AUTH_START" }
    | { type: "AUTH_SUCCESS", payload: { user: IUser, token: string, message: string } }
    | { type: "AUTH_FAILURE", payload: string }
    | { type: "AUTH_UPDATE_USER", payload: IUser }
    | { type: "AUTH_LOGOUT" }
    | { type: "AUTH_RESET_MESSAGES" }

export interface IAuthReducer extends IAuthReducerState {
    handleResetAuthMessages: () => void
    handleUpdateLoggedUser: (userData: IUser) => void
    handleLogin: (userData: Partial<IUserCreate>, verifyIfIsAdmin?: boolean) => Promise<void>
    handleSignup: (userData: Partial<IUserCreate>) => Promise<void>
    handleLogout: () => void
}

// PLATES & CATEGORIES
export interface IPlatesReducerState {
    fetching: boolean
    fetchErrorMessage: string | null
    mutating: boolean
    mutateSuccess: boolean
    mutateSuccessMessage: string | null
    mutateErrorMessage: string | null
    deleting: boolean
    deleteSuccess: boolean
    deleteSuccessMessage: string | null
    deleteErrorMessage: string | null
    categories: ICategory[]
    currentCategory: ICategory | null
    plates: IPlate[]
    currentPlate: IPlate | null
}

export type IPlatesReducerActions =
    | { type: "PLATES_FETCH_START" }
    | { type: "PLATES_FETCH_SUCCESS", payload: { plates?: IPlate[], categories?: ICategory[] } }
    | { type: "PLATES_FETCH_FAILURE", payload: string }
    | { type: "PLATES_MUTATE_START" }
    | { type: "PLATES_MUTATE_SUCCESS", payload: { plate: IPlate, message: string } }
    | { type: "PLATES_CATEGORY_MUTATE_SUCCESS", payload: { category: ICategory, message: string } }
    | { type: "PLATES_MUTATE_FAILURE", payload: string }
    | { type: "PLATES_DELETE_START" }
    | { type: "PLATES_DELETE_SUCCESS", payload: { plateId: string, message: string } }
    | { type: "PLATES_CATEGORY_DELETE_SUCCESS", payload: { categoryId: string, message: string } }
    | { type: "PLATES_DELETE_FAILURE", payload: string }
    | { type: "SET_CATEGORY_TO_EDIT", payload: ICategory | null }
    | { type: "SET_PLATE_TO_EDIT", payload: IPlate | null }
    | { type: "PLATES_RESET_MESSAGES" }

export interface IPlatesReducer extends IPlatesReducerState {
    handleResetPlatesMessages: () => void
    handleSetCategoryToEdit: (category: ICategory | null) => void
    handleSetPlateToEdit: (plate: IPlate | null) => void
    handleFetchCategories: () => Promise<void>
    handleFetchPlates: () => Promise<void>
    handleFetchAvailableCategories: () => Promise<void>
    handleFetchAvailablePlates: () => Promise<void>
    handleCreateCategory: (categoryData: Partial<ICategory>) => Promise<void>
    handleCreatePlate: (plateData: Partial<IPlate>, plateImage: File | null) => Promise<void>
    handleUpdateCategory: (categoryData: Partial<ICategory>, categoryId: string) => Promise<void>
    handleUpdatePlate: (plateData: Partial<IPlate>, plateImage: File | null, plateId: string) => Promise<void>
    handleDeleteCategory: (categoryId: string) => Promise<void>
    handleDeletePlate: (plateId: string) => Promise<void>
    handleDisablePlate: (plateId: string) => Promise<void>
    handleEnablePlate: (plateId: string) => Promise<void>
}

// ORDERS
export interface IOrdersReducerState {
    fetching: boolean
    fetchSuccess: boolean
    fetchErrorMessage: string | null
    mutating: boolean
    mutateSuccess: boolean
    mutateSuccessMessage: string | null
    mutateErrorMessage: string | null
    cancellingOrderItem: boolean
    deleting: boolean
    deleteSuccess: boolean
    deleteSuccessMessage: string | null
    deleteErrorMessage: string | null
    verifyingPastOrder: boolean
    pastOrderVerified: boolean
    pastOrderMessage: string | null
    cancelledOrderIds: string[]
    orders: IOrder[]
    currentOrder: IOrder | null
}

export type IOrdersReducerActions =
    | { type: "ORDERS_FETCH_START" }
    | { type: "ORDERS_FETCH_SUCCESS", payload: IOrder[] }
    | { type: "ORDERS_FETCH_FAILURE", payload: string }
    | { type: "ORDERS_MUTATE_START" }
    | { type: "ORDERS_MUTATE_SUCCESS", payload: { order: IOrder, message: string } }
    | { type: "ORDERS_MUTATE_FAILURE", payload: string }
    | { type: "ORDERS_CANCEL_ITEM_START" }
    | { type: "ORDERS_CANCEL_ITEM_SUCCESS", payload: IOrderItem }
    | { type: "ORDERS_CANCEL_ITEM_FAILURE", payload: string }
    | { type: "ORDERS_DELETE_START" }
    | { type: "ORDERS_DELETE_SUCCESS", payload: { orderId: string, message: string } }
    | { type: "ORDERS_DELETE_FAILURE", payload: string }
    | { type: "ORDERS_VERIFY_PAST_ORDER_START" }
    | { type: "ORDERS_VERIFY_PAST_ORDER_SUCCESS", payload: { order: IOrder, message: string } }
    | { type: "ORDERS_VERIFY_PAST_ORDER_ABORT" }
    | { type: "ORDERS_RESET_MESSAGES" }
    | { type: "SET_ORDER_TO_EDIT", payload: IOrder | null }

export interface IOrdersReducer extends IOrdersReducerState {
    handleResetOrdersMessage: () => void
    handleSetOrderToEdit: (order: IOrder | null) => void
    handleFetchOrders: () => Promise<void>
    handleFetchOrdersByUser: (userId: string) => Promise<void>
    handleCreateOrder: (orderData: Partial<IOrderCreate>) => Promise<void>
    handleUpdateOrder: (orderData: Partial<IOrderUpdate>, orderId: string, isAdmin?: boolean) => Promise<void>
    handleConcludeOrder: (orderId: string) => Promise<void>
    handleCancelOrder: (orderId: string) => Promise<void>
    handleCancelOrderItem: (orderItemId: string) => Promise<void>
    handleDeleteOrder: (orderId: string) => Promise<void>
    handleVerifyPastOrder: (order: IOrder) => Promise<void>
}

// USERS
export interface IUsersReducerState {
    fetching: boolean
    fetchSuccess: boolean
    fetchErrorMessage: string | null
    mutating: boolean
    mutateSuccess: boolean
    mutateSuccessMessage: string | null
    mutateErrorMessage: string | null
    deleting: boolean
    deleteSuccess: boolean
    deleteSuccessMessage: string | null
    deleteErrorMessage: string | null
    users: IUser[]
    currentUser: IUser | null
}

export type IUsersReducerActions =
    | { type: "USERS_FETCH_START" }
    | { type: "USERS_FETCH_SUCCESS", payload: IUser[] }
    | { type: "USERS_FETCH_FAILURE", payload: string }
    | { type: "USERS_MUTATE_START" }
    | { type: "USERS_MUTATE_SUCCESS", payload: { user: IUser, message: string } }
    | { type: "USERS_MUTATE_FAILURE", payload: string }
    | { type: "USERS_DELETE_START" }
    | { type: "USERS_DELETE_SUCCESS", payload: { userId: string, message: string } }
    | { type: "USERS_DELETE_FAILURE", payload: string }
    | { type: "USERS_RESET_MESSAGES" }
    | { type: "SET_USER_TO_EDIT", payload: IUser | null }

export interface IUsersReducer extends IUsersReducerState {
    handleResetUsersMessage: () => void
    handleSetUserToEdit: (user: IUser | null) => void
    handleFetchUsers: () => Promise<void>
    handleCreateUser: (userData: Partial<IUserCreate>, photo: File | null) => Promise<void>
    handleUpdateUser: (userData: Partial<IUserUpdate>, userId: string, photo?: File | null, isAdmin?: boolean, userIsAuthenticated?: boolean) => Promise<void>
    handleUpdatePhoto: (photo: File | null, userId: string) => Promise<void>
    handleDeleteUser: (userId: string, userIsAuthenticated: boolean) => Promise<void>
}