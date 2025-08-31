import type { ICartItem } from "./cart-item";
import type { ICategory } from "./category";
import type { IPlate } from "./plate";
import type { ICategoryState, IPlateState } from "./reducer-state";
import type { IUser } from "./user";

export interface IContext {
    cart: {
        cart: ICartItem[]
        addToCart: (data: ICartItem) => void
        removeFromCart: (data: ICartItem) => void
        updateQuantity: (data: ICartItem, quantity: number) => void
        clearCart: () => void
    }

    auth: {
        user: IUser | null
        authenticated: boolean
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
}