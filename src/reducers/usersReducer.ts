import { useReducer, useState } from "react";
import type { IReducerAction, IUserState } from "../interfaces/reducer-state";
import type { IUser } from "../interfaces/user";
import usersService from "../services/users-service";

const state: IUserState = {
    success: false,
    loading: false,
    errorMessage: null,
    successMessage: null,
    users: [],
    user: null
}

const usersReducerActions = (state: IUserState, action: IReducerAction) => {
    switch (action.status) {
        case "pending":
            return {
                ...state,
                success: false,
                loading: true
            }

        case "fulfilled":
            return {
                ...state,
                success: true,
                loading: false,
                users: action.payload.data ?? state.users,
                user: action.payload.single ?? state.user,
                successMessage: action.payload.message,
                errorMessage: null
            }

        case "rejected":
            return {
                ...state,
                success: false,
                loading: false,
                errorMessage: action.payload,
                successMessage: null,
                users: [],
                user: null
            }

        default:
            return state
    }
}

export const usersReducer = () => {
    const [usersState, dispatch] = useReducer<IUserState, [action: IReducerAction]>(usersReducerActions, state)
    const [cancelled, setCancelled] = useState<boolean>(false)

    const getUsers = async () => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await usersService.getUsers()

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao carregar usuários." })
            return
        }

        dispatch({
            status: "fulfilled",
            payload: { data: res.body, }
        })
    }

    const updateUser = async (userId: string, userData: Partial<IUser>) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        const res = await usersService.updateUser(userId, userData)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao atualizar perfil." })
            return
        }

        await getUsers()

        dispatch({
            status: "fulfilled",
            payload: { message: "Perfil atualizado com sucesso." }
        })
    }

    return { usersState, getUsers, updateUser }
}