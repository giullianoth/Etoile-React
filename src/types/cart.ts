import type { IPlate } from "./plate";

export interface ICartItem {
    plate: IPlate
    quantity: number
}

export interface ICartContext {
    cart: ICartItem[]
    addToCart: (cartItem: IPlate, quantity?: number) => void
    updateQuantity: (plateId: string, quantity: number) => void
    removeFromCart: (cartItem: IPlate) => void
    clearCart: () => void
}