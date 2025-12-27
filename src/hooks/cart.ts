import { useCallback, useState } from "react"
import type { ICartItem } from "../types/cart"
import type { IPlate } from "../types/plate"

const storagedCart = () => localStorage.getItem("etoile-cart")

export const useCart = () => {
    const [cart, setCart] = useState<ICartItem[]>(
        storagedCart() ? JSON.parse(storagedCart()!) : []
    )

    const addToCart = useCallback((cartItem: IPlate) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.plate._id === cartItem._id)

            const newCartList = existingItem
                ? prevCart.map(item =>
                    item.plate._id === cartItem._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...prevCart, { plate: cartItem, quantity: 1 }]

            localStorage.setItem("etoile-cart", JSON.stringify(newCartList))
            return newCartList
        })
    }, [])

    const updateQuantity = useCallback((plateId: string, quantity: number) => {
        setCart(prevCart => {
            const updatedCartList = prevCart.map(item =>
                item.plate._id === plateId
                    ? { ...item, quantity: quantity }
                    : item
            )
            localStorage.setItem("etoile-cart", JSON.stringify(updatedCartList))
            return updatedCartList
        })
    }, [])

    const removeFromCart = useCallback((cartItem: IPlate) => {
        setCart(prevCart => {
            const strippedCartList = prevCart.filter(item => item.plate._id !== cartItem._id)
            localStorage.setItem("etoile-cart", JSON.stringify(strippedCartList))
            return strippedCartList
        })
    }, [])

    const clearCart = useCallback(() => {
        localStorage.removeItem("etoile-cart")
        setCart([])
    }, [])

    return {
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
    }
}