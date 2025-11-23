import { useEffect } from "react"
import { useAppContext } from "../../context/context"
import { useNavigate } from "react-router-dom"
import User from "../../components/Pages/Profile/User"
import Orders from "../../components/Pages/Profile/Orders"

const Profile = () => {
    const { success: authenticated, user } = useAppContext().auth
    const navigate = useNavigate()

    const {
        handleFetchOrdersByUser,
        loading,
        errorMessage,
        orders,
        handleClearOrdersData
    } = useAppContext().orders

    useEffect(() => {
        if (!authenticated) {
            navigate("/autenticacao")
        }
    }, [authenticated])

    useEffect(() => {
        handleClearOrdersData()

        const fetchOrders = async () => {
            if (user) {
                await handleFetchOrdersByUser(user._id)
            }
        }

        fetchOrders()
    }, [user, handleFetchOrdersByUser])

    return (
        <>
            <User user={user!} />

            <Orders
                orders={orders}
                loading={loading}
                errorMessage={errorMessage} />
        </>
    )
}

export default Profile