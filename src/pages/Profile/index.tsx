import User from "../../components/Pages/Profile/User"
import Orders from "../../components/Pages/Profile/Orders"
import { useAppContext } from "../../context/app-context"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Profile = () => {
    const { success: authenticated, user, token } = useAppContext().auth
    const navigate = useNavigate()

    useEffect(() => {
        if (!authenticated || !user || !token) {
            navigate("/autenticacao")
        }
    }, [authenticated, navigate, token, user])

    return (
        <>
            <User />
            <Orders />
        </>
    )
}

export default Profile