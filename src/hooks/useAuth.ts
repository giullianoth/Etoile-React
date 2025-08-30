import { useEffect, useState } from "react"
import type { IUser } from "../interfaces/user"
import { users } from "../data/users"

export const useAuth = () => {
    const [user, setUser] = useState<IUser | null>(users[1])
    const [authenticated, setAuthenticated] = useState<boolean>(true)

    useEffect(() => {
        setUser(users[0])
        setAuthenticated(true)
    }, [])

    return { user, authenticated }
}