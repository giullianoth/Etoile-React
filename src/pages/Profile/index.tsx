import { useNavigate } from "react-router-dom"
import Orders from "../../components/pages/profile/Orders"
import User from "../../components/pages/profile/User"
import { useAppContext } from "../../context/context"
import type { IUser } from "../../interfaces/user"
import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useAppContext().auth.authState
  const { authenticated } = useAuth()
  const { ordersState, getOrdersByUser, cancelled } = useAppContext().orders
  const { orders } = ordersState

  useEffect(() => {
    if (!authenticated && !user) {
      navigate("/login")
    } else {
      if (!cancelled) {
        getOrdersByUser(user?._id!)
      }
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