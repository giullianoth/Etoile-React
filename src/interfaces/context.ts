import type { ICartItem } from "./cart-item";
import type { ICategory } from "./category";
import type { IOrder, IOrderItem } from "./order";
import type { IPlateRegister } from "./plate";
import type { IAuthState, ICategoryState, IOrderState, IPlateState, IUserState } from "./reducer-state";
import type { IUser, IUserRegister, IUserUpdate } from "./user";

export interface IContext {
    cart: {
        cart: ICartItem[]
        addToCart: (data: ICartItem) => void
        removeFromCart: (data: ICartItem) => void
        updateQuantity: (data: ICartItem, quantity: number) => void
        clearCart: () => void
    }

    categories: {
        categoriesState: ICategoryState
        cancelled: boolean
        resetState: () => void
        getCategories: () => Promise<void>
        getAvailableCategories: () => Promise<void>
        addCategory: (categoryData: Partial<ICategory>) => Promise<void>
        updateCategory: (categoryId: string, categoryData: Partial<ICategory>) => Promise<void>
        deleteCategory: (categoryId: string) => Promise<void>
    }

    plates: {
        platesState: IPlateState
        cancelled: boolean
        resetState: () => void
        getPlates: () => Promise<void>
        getAvailablePlates: () => Promise<void>
        addPlate: (plateData: Partial<IPlateRegister>) => Promise<void>
        updatePlate: (plateId: string, plateData: Partial<IPlateRegister>) => Promise<void>
        deletePlate: (plateId: string) => Promise<void>
    }

    orders: {
        ordersState: IOrderState
        cancelled: boolean
        resetState: () => void
        getOrders: () => Promise<void>
        getOrdersByUser: (userId: string) => Promise<void>
        addOrder: (orderData: Partial<IOrder>, orderItems: Partial<IOrderItem>[]) => Promise<void>
        deleteOrder: (orderId: string) => Promise<void>
    }

    auth: {
        authState: IAuthState
        resetState: () => void
        register: (authData: Partial<IUserRegister>) => Promise<void>
        login: (authData: Partial<IUser>) => Promise<void>
        logout: () => void
    }

    users: {
        usersState: IUserState
        resetState: () => void
        getUsers: () => Promise<void>
        updateUser: (userId: string, userData: Partial<IUserUpdate>) => Promise<void>
        deleteUser: (userId: string) => Promise<void>
    }
}