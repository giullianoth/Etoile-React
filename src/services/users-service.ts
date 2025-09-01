import type { IUser } from "../interfaces/user";
import { apiUrl } from "./api-config";

const getUsers = async () => {
    try {
        const res = await fetch(`${apiUrl}/users`, {
            method: "GET",
            headers: {}
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const updateUser = async (userId: string, userData: Partial<IUser>) => {
    try {
        const res = await fetch(`${apiUrl}/plates/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.error(error)
    }
}

const usersService = {
    getUsers,
    updateUser
}

export default usersService