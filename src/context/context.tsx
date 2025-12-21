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
    const contextValue: IContext = {
        message: useMessage(),
        cart: useCart(),
        auth: useAuthReducer(),
        orders: useOrdersReducer(),
        plates: usePlatesReducer(),
        users: useUsersReducer()
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