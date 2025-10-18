import { useAppContext } from "../../context/context"
import User from "../../components/pages/profile/User"
import type { IUser } from "../../interfaces/user"
import { useEffect } from "react"
import Orders from "../../components/pages/profile/Orders"

const Profile = () => {
  const { user } = useAppContext().auth.authState
  const { ordersState, getOrdersByUser, refetch } = useAppContext().orders

  useEffect(() => {
    const fetchOrders = async () => {
      if (refetch) {
        await getOrdersByUser(user?._id!)
      }
    }

    fetchOrders()
  }, [refetch])

  return (
    <>
      <User user={user as IUser} />
      <Orders orders={ordersState.orders} />
    </>
  )
}

export default Profile