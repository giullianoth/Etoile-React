import type { ICartItem } from "./cart-item";
import type { ICategory } from "./category";
import type { IOrder } from "./order";
import type { IPlate } from "./plate";
import type { IAuthState, ICategoryState, IOrderState, IPlateState } from "./reducer-state";
import type { IUser, IUserRegister } from "./user";

export interface IContext {
    cart: {
        cart: ICartItem[]
        addToCart: (data: ICartItem) => void
        removeFromCart: (data: ICartItem) => void
        updateQuantity: (data: ICartItem, quantity: number) => void
        clearCart: () => void
    }

    useAuth: {
        authenticated: boolean,
        loading: boolean
    }

    categories: {
        categoriesState: ICategoryState
        getCategories: () => void
        getAvailableCategories: () => void
        addCategory: (categoryData: Partial<ICategory>) => void
        updateCategory: (categoryId: string, categoryData: Partial<ICategory>) => void
        deleteCategory: (categoryId: string) => void
    }

    plates: {
        platesState: IPlateState
        getPlates: () => void
        getAvailablePlates: () => void
        addPlate: (plateData: Partial<IPlate>) => void
        updatePlate: (plateId: string, plateData: Partial<IPlate>) => void
        deletePlate: (plateId: string) => void
    }

    orders: {
        ordersState: IOrderState
        getOrders: () => void
        getOrdersByUser: (userId: string) => void
        addOrder: (orderData: Partial<IOrder>) => void
        updateOrder: (orderId: string, orderData: Partial<IPlate>) => void
        deleteOrder: (orderId: string) => void
    }

    auth: {
        authState: IAuthState
        register: (authData: Partial<IUserRegister>) => void
        login: (authData: Partial<IUser>) => void
        logout: () => void
    }
}