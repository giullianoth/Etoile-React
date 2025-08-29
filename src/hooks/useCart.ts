import { useState } from "react"
import type { ICartItem } from "../interfaces/cart-item"

export const useCart = () => {
    const storaged = localStorage.getItem("etoile-cart")
    const [cart, setCart] = useState<ICartItem[]>(storaged ? JSON.parse(storaged) : [])

    const addToCart = (data: ICartItem) => {
        let updated: ICartItem[]

        if (cart.some(item => item.plateId === data.plateId)) {
            updated = cart.map(item => {
                if (item.plateId === data.plateId) {
                    item.quantity += data.quantity
                }
                return item
            })
        } else {
            updated = [...cart, data]
        }

        setCart(updated)
        localStorage.setItem("etoile-cart", JSON.stringify(updated))
    }

    const removeFromCart = (data: ICartItem) => {
        const stripped = cart.filter(item => item !== data)
        setCart(stripped)
        localStorage.setItem("etoile-cart", JSON.stringify(stripped))
    }

    const updateQuantity = (data: ICartItem, quantity: number) => {
        const updated = cart.map(item => {
            if (item.plateId === data.plateId) {
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