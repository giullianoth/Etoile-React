import { useEffect, useState } from "react"
import { useAppContext } from "../context/context"

export const useAuth = () => {
    const { authState } = useAppContext().auth
    const { user } = authState
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (user) {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }

        setLoading(false)
    }, [user])

    return { authenticated, loading }
}