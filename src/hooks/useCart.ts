import { useState } from "react"
import type { ICartItem } from "../types/cart-item"

export const useCart = () => {
    const storaged = localStorage.getItem("etoile-cart")
    const [cart, setCart] = useState<ICartItem[]>(storaged ? JSON.parse(storaged) : [])

    const addToCart = (cartData: ICartItem) => {
        let updated: ICartItem[]

        if (cart.some(item => item.plate === cartData.plate)) {
            updated = cart.map(item => {
                if (item.plate === cartData.plate) {
                    item.quantity += cartData.quantity
                }
                return item
            })
        } else {
            updated = [...cart, cartData]
        }

        setCart(updated)
        localStorage.setItem("etoile-cart", JSON.stringify(updated))
    }

    const removeFromCart = (cartData: ICartItem) => {
        const stripped = cart.filter(item => item !== cartData)
        setCart(stripped)
        localStorage.setItem("etoile-cart", JSON.stringify(stripped))
    }

    const updateQuantity = (cartData: ICartItem, quantity: number) => {
        const updated = cart.map(item => {
            if (item.plate === cartData.plate) {
                item.quantity = quantity
            }
            return item
        })

        setCart(updated)
        localStorage.setItem("etoile-cart", JSON.stringify(updated))
    }

    const clearCart = () => {
        localStorage.removeItem("etoile-cart")
        setCart([])
    }

    return { cart, addToCart, removeFromCart, updateQuantity, clearCart }
}