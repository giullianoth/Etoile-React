import { useEffect, useReducer, useState } from "react";
import type { IReducerAction, IUserState } from "../interfaces/reducer-state";
import type { IUserUpdate } from "../interfaces/user";
import usersService from "../services/users-service";

const initialState: IUserState = {
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
                success: true,
                loading: false,
                users: action.payload ?? state.users,
                successMessage: action.payload.message,
                errorMessage: null
            }

        case "rejected":
            return {
                success: false,
                loading: false,
                errorMessage: action.payload,
                successMessage: null,
                users: []
            }

        case "reset":
            return initialState

        default:
            return state
    }
}

export const usersReducer = () => {
    const [usersState, dispatch] = useReducer<IUserState, [action: IReducerAction]>(usersReducerActions, initialState)
    const [cancelled, setCancelled] = useState<boolean>(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const resetState = () => dispatch({ status: "reset" })

    const getUsers = async () => {
        checkIfIsCancelled()

        dispatch({ status: "pending" })

        const res = await usersService.getUsers()

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao carregar usuários."
            })

            return
        }

        dispatch({
            status: "fulfilled",
            payload: res.body
        })
    }

    const updateUser = async (userId: string, userData: Partial<IUserUpdate>) => {
        checkIfIsCancelled()

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
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao atualizar perfil."
            })

            return
        }

        await getUsers()

        dispatch({
            status: "fulfilled",
            payload: { message: "Perfil atualizado com sucesso." }
        })
    }

    const deleteUser = async (userId: string) => {
        checkIfIsCancelled()

        dispatch({ status: "pending" })

        const res = await usersService.deleteUser(userId)

        if (!res.success) {
            dispatch({
                status: "rejected",
                payload: res.body ? res.body.text : "Erro ao excluir usuário."
            })

            return
        }

        await getUsers()

        dispatch({
            status: "fulfilled",
            payload: { message: "Usuário excluído com sucesso." }
        })
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { usersState, resetState, getUsers, updateUser, deleteUser }
}