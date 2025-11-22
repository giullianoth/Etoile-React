import { createContext, type ReactNode } from "react";
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