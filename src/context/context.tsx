import { createContext, useContext, type ReactNode } from "react";
import type { IContext } from "../types/context";
import { useAuthReducer } from "../reducers/auth-reducer";
import { useOrdersReducer } from "../reducers/orders-reducer";
import { useMessage } from "../hooks/message";
import { usePlatesReducer } from "../reducers/plates-reducer";
import { useCart } from "../hooks/cart";
import { useUsersReducer } from "../reducers/users-reducer";

type Props = {
    children: ReactNode
}

const AppContext = createContext<IContext | null>(null)

export const AppProvider = ({ children }: Props) => {
    const authReducer = useAuthReducer()
    const messageHook = useMessage()
    const cartHook = useCart()
    const ordersReducer = useOrdersReducer()
    const platesReducer = usePlatesReducer()
    const usersReducer = useUsersReducer(authReducer.handleUpdateLoggedUser)

    const contextValue: IContext = {
        message: messageHook,
        cart: cartHook,
        auth: authReducer,
        orders: ordersReducer,
        plates: platesReducer,
        users: usersReducer
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error("Out of context. Please, use <AppProvider> component.")
    }

    return context
}