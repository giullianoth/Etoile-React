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
        fetching: loadingOrders,
        fetchErrorMessage,
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
        const fetchOrders = async () => {
            if (user?._id && !loading) {
                await handleFetchOrdersByUser(user._id)
            }
        }

        fetchOrders()

        return () => handleClearOrdersData()
    }, [user?._id, loading])

    return (
        loading
            ? <Loading />
            : <>
                {user && <User user={user} />}

                {orders &&
                    <Orders
                        orders={orders}
                        loading={loadingOrders}
                        errorMessage={fetchErrorMessage} />}
            </>
    )
}

export default Profile