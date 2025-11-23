import { useEffect } from "react"
import { useAppContext } from "../../context/context"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const { success: authenticated } = useAppContext().auth
    const navigate = useNavigate()

    useEffect(() => {
        if (!authenticated) {
            navigate("/autenticacao")
        }
    }, [authenticated])

    return (
        <div>Profile</div>
    )
}

export default Profile