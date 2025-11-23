import { useEffect } from "react"
import { useAppContext } from "../../context/context"
import { useNavigate } from "react-router-dom"
import User from "../../components/Pages/Profile/User"

const Profile = () => {
    const { success: authenticated, user } = useAppContext().auth
    const navigate = useNavigate()

    useEffect(() => {
        if (!authenticated) {
            navigate("/autenticacao")
        }
    }, [authenticated, user])

    return (
        <User user={user!} />
    )
}

export default Profile