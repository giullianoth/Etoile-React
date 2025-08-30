import type { ICartItem } from "./cart-item";
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
}