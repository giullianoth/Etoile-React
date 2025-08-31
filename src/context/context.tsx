import { createContext, useContext, type ReactNode } from "react"
import type { IContext } from "../interfaces/context"
import { useCart } from "../hooks/useCart"
import { useAuth } from "../hooks/useAuth"
import { categoriesReducer } from "../reducers/categoriesReducer"
import { platesReducer } from "../reducers/platesReducer"

type Props = {
    children?: ReactNode
}

const Context = createContext<IContext | undefined>(undefined)

export const ContextProvider = ({ children }: Props) => {
    const cart = useCart()
    const auth = useAuth()
    const categories = categoriesReducer()
    const plates = platesReducer()

    const contextValues: IContext = {
        cart,
        auth,
        categories,
        plates
    }

    return (
        <Context.Provider value={contextValues}>
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