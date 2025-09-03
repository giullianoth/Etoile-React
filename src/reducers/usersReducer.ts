import { useReducer, useState } from "react";
import type { IReducerAction, IUserState } from "../interfaces/reducer-state";
import type { IUserUpdate } from "../interfaces/user";
import usersService from "../services/users-service";

const state: IUserState = {
    success: false,
    loading: false,
    errorMessage: null,
    successMessage: null,
    users: []
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
                users: action.payload ?? state.users,
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
                users: []
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
            payload: res.body
        })

        setCancelled(true)
    }

    const updateUser = async (userId: string, userData: Partial<IUserUpdate>) => {
        if (cancelled) {
            setCancelled(false)
            return
        }

        dispatch({ status: "pending" })

        if (!userData.fullname) {
            dispatch({ status: "rejected", payload: "Digite o nome." })
            return
        }

        if (userData.confirmPassword) {
            if (!userData.password) {
                dispatch({ status: "rejected", payload: "Digite a senha." })
                return
            }

            if (!userData.newPassword) {
                dispatch({ status: "rejected", payload: "Digite a sua nova senha." })
                return
            }

            if (!userData.confirmPassword) {
                dispatch({ status: "rejected", payload: "Confirme a sua nova senha." })
                return
            }

            if (userData.newPassword !== userData.confirmPassword) {
                dispatch({ status: "rejected", payload: "As senhas digitadas não conferem." })
                return
            }
        }

        const { changePassword, password, confirmPassword, ...userDataRest } = userData

        const res = await usersService.updateUser(userId, userDataRest)

        if (!res.success) {
            dispatch({ status: "rejected", payload: "Erro ao atualizar perfil." })
            return
        }

        await getUsers()

        dispatch({
            status: "fulfilled",
            payload: { message: "Perfil atualizado com sucesso." }
        })

        setCancelled(true)
    }

    return { usersState, getUsers, updateUser }
}