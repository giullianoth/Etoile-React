import { createContext, useContext, type ReactNode } from "react"
import type { IContext } from "../interfaces/context"
import { useCart } from "../hooks/useCart"
import { categoriesReducer } from "../reducers/categoriesReducer"
import { platesReducer } from "../reducers/platesReducer"
import { ordersReducer } from "../reducers/ordersReducer"
import { authReducer } from "../reducers/authReducer"
import { usersReducer } from "../reducers/usersReducer"
import { messageReducer } from "../reducers/messageReducer"

type Props = {
    children?: ReactNode
}

const Context = createContext<IContext | undefined>(undefined)

export const ContextProvider = ({ children }: Props) => {
    const contextValues: IContext = {
        cart: useCart(),
        message: messageReducer(),
        categories: categoriesReducer(),
        plates: platesReducer(),
        orders: ordersReducer(),
        auth: authReducer(),
        users: usersReducer()
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