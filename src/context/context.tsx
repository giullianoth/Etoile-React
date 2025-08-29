import { createContext, useContext, type ReactNode } from "react"
import type { IContext } from "../interfaces/context"
import { useCart } from "../hooks/useCart"

type Props = {
    children?: ReactNode
}

const Context = createContext<IContext | undefined>(undefined)

export const ContextProvider = ({ children }: Props) => {
    const cart = useCart()

    return (
        <Context.Provider value={{ cart }}>
            {children}
        </Context.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(Context)

    if (!context) {
        throw new Error("Out of context, please use ContextProvider component.")
    }

    return context
}