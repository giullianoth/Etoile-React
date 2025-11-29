import { useState } from "react"
import type { ICartItem } from "../types/cart"
import type { IPlate } from "../types/plate"

const storagedCart = localStorage.getItem("etoile-cart")

export const useCart = () => {
    const [cart, setCart] = useState<ICartItem[]>(
        storagedCart
            ? JSON.parse(storagedCart)
            : []
    )

    const addToCart = (cartItem: IPlate) => {
        const existingItem = cart.find(item => item.plate._id === cartItem._id)
        const quantity = existingItem ? existingItem.quantity + 1 : 1

        const newCartList = existingItem
            ? cart.map(item => {
                if (item === existingItem) {
                    item.quantity = quantity
                }
                return item
            })
            : [...cart, { plate: cartItem, quantity }]

        localStorage.setItem("etoile-cart", JSON.stringify(newCartList))
        setCart(newCartList)
    }

    return {
        cart,
        addToCart
    }
}