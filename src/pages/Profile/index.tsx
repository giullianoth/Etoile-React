import { useNavigate } from "react-router-dom"
import Orders from "../../components/pages/profile/Orders"
import User from "../../components/pages/profile/User"
import { useAppContext } from "../../context/context"
import type { IUser } from "../../interfaces/user"
import { useEffect } from "react"

const Profile = () => {
  const { authenticated } = useAppContext().useAuth
  const navigate = useNavigate()
  const { user } = useAppContext().auth.authState
  const { ordersState, getOrdersByUser } = useAppContext().orders
  const { orders } = ordersState

  useEffect(() => {
    if (!authenticated && !user) {
      navigate("/login")
    } else {
      getOrdersByUser(user?._id!)
    }
  }, [authenticated, user])

  return (
    <>
      <User user={user as IUser} />
      <Orders orders={orders} />
    </>
  )
}

export default Profile