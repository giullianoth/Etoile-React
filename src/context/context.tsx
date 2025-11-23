import { createContext, useContext, type ReactNode } from "react";
import type { IContext } from "../types/context";
import { useAuthReducer } from "../reducers/auth-reducer";

type Props = {
    children: ReactNode
}

const AppContext = createContext<IContext | null>(null)

export const AppProvider = ({ children }: Props) => {
    const contextValue: IContext = {
        auth: useAuthReducer()
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