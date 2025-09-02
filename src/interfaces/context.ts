import type { ICartItem } from "./cart-item";
import type { ICategory } from "./category";
import type { IOrder } from "./order";
import type { IPlate } from "./plate";
import type { IAuthState, ICategoryState, IOrderState, IPlateState, IUserState } from "./reducer-state";
import type { IUser, IUserRegister } from "./user";

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
        getCategories: () => Promise<void>
        getAvailableCategories: () => Promise<void>
        addCategory: (categoryData: Partial<ICategory>) => Promise<void>
        updateCategory: (categoryId: string, categoryData: Partial<ICategory>) => Promise<void>
        deleteCategory: (categoryId: string) => Promise<void>
    }

    plates: {
        platesState: IPlateState
        getPlates: () => Promise<void>
        getAvailablePlates: () => Promise<void>
        addPlate: (plateData: Partial<IPlate>) => Promise<void>
        updatePlate: (plateId: string, plateData: Partial<IPlate>) => Promise<void>
        deletePlate: (plateId: string) => Promise<void>
    }

    orders: {
        ordersState: IOrderState
        getOrders: () => Promise<void>
        getOrdersByUser: (userId: string) => Promise<void>
        addOrder: (orderData: Partial<IOrder>) => Promise<void>
        updateOrder: (orderId: string, orderData: Partial<IPlate>) => Promise<void>
        deleteOrder: (orderId: string) => Promise<void>
    }

    auth: {
        authState: IAuthState
        register: (authData: Partial<IUserRegister>) => Promise<void>
        login: (authData: Partial<IUser>) => Promise<void>
        logout: () => void
    }

    users: {
        usersState: IUserState
        getUsers: () => Promise<void>
        updateUser: (userId: string, userData: Partial<IUser>) => Promise<void>
    }
}