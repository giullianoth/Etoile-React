import { useEffect, useState } from "react"
import { useAppContext } from "../../context/context"
import { useNavigate } from "react-router-dom"
import User from "../../components/Pages/Profile/User"
import Orders from "../../components/Pages/Profile/Orders"
import Loading from "../../components/Loading"

const Profile = () => {
    const { success: authenticated, user } = useAppContext().auth
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    const {
        handleFetchOrdersByUser,
        loading: loadingOrders,
        errorMessage,
        orders,
        handleClearOrdersData
    } = useAppContext().orders

    useEffect(() => {
        if (!authenticated) {
            navigate("/autenticacao")
            return
        }

        setLoading(false)
    }, [])

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
        loading
            ? <Loading />
            : <>
                {user && <User user={user} />}

                {orders &&
                    <Orders
                        orders={orders}
                        loading={loadingOrders}
                        errorMessage={errorMessage} />}
            </>
    )
}

export default Profile