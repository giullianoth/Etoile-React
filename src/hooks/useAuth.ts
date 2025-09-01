import { useEffect, useState } from "react"
import { useAppContext } from "../context/context"

export const useAuth = () => {
    const { authState } = useAppContext().auth
    const { user } = authState
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const authenticatedUser = localStorage.getItem("etoile-auth")

        if (user && authenticatedUser && JSON.parse(authenticatedUser)) {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }

        setLoading(false)
    }, [user])

    return { authenticated, loading }
}