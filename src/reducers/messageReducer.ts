import { useReducer } from "react"
import type { IMessageState, IReducerAction } from "../interfaces/reducer-state"

const state: IMessageState = {
    message: null,
    isVisible: false
}

const messageReducerActions = (state: IMessageState, action: IReducerAction) => {
    switch (action.status) {
        case "fulfilled":
            return {
                ...state,
                message: action.payload,
                isVisible: true
            }

        case "reset":
            return {
                message: null,
                isVisible: false
            }

        default:
            return state
    }
}

export const messageReducer = () => {
    const [messageState, dispatch] = useReducer<IMessageState, [action: IReducerAction]>(messageReducerActions, state)

    const showMessage = (message: string, milliSeconds: number = 3000) => {
        dispatch({ status: "fulfilled", payload: message })

        setTimeout(() => {
            dispatch({ status: "reset" })
        }, milliSeconds)
    }

    return { messageState, showMessage }
}