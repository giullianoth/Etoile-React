import { useState } from "react"
import type { ICartItem } from "../types/cart"
import type { IPlate } from "../types/plate"

const storagedCart = localStorage.getItem("etoile-cart")

export const useCart = () => {
    const [cart, setCart] = useState<ICartItem[]>(
        storagedCart ? JSON.parse(storagedCart) : []
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

    const updateQuantity = (cartItem: IPlate, quantity: number) => {
        const updatedCartList = cart.map(item => {
            if (item.plate === cartItem) {
                item.quantity = quantity
            }
            return item
        })

        localStorage.setItem("etoile-cart", JSON.stringify(updatedCartList))
        setCart(updatedCartList)
    }

    const removeFromCart = (cartItem: IPlate) => {
        const strippedCartList = cart.filter(item => item.plate !== cartItem)

        localStorage.setItem("etoile-cart", JSON.stringify(strippedCartList))
        setCart(strippedCartList)
    }

    const clearCart = () => {
        localStorage.removeItem("etoile-cart")
        setCart([])
    }

    return {
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
    }
}