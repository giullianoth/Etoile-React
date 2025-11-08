import { createContext, useContext, type ReactNode } from "react";
import type { IContext } from "../types/context";
import useAuthReducer from "../reducers/auth-reducer";
import { useShowTrigger } from "../hooks/useShowTrigger";

type Props = {
    children: ReactNode
}

const Context = createContext<IContext | undefined>(undefined)

export const AppProvider = ({ children }: Props) => {
    const contextValues: IContext = {
        message: useShowTrigger(),
        auth: useAuthReducer()
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
        throw new Error("Out of app context. Please, use 'AppContext' component.")
    }

    return context
}