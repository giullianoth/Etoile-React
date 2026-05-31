import { createContext, useContext } from "react"
import type { IContext } from "../types/context"

export const AppContext = createContext<IContext>({} as IContext)

export const useAppContext = () => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error("Out of context. Please, use <AppProvider> component.")
    }

    return context
}