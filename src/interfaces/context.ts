import type { ICartItem } from "./cart-item";

export interface IContext {
    cart: {
        cart: ICartItem[]
        addToCart: (data: ICartItem) => void
        removeFromCart: (data: ICartItem) => void
        updateQuantity: (data: ICartItem, quantity: number) => void
        clearCart: () => void
    }
}