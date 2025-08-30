import Orders from "../../components/pages/profile/Orders"
import User from "../../components/pages/profile/User"
import { useAppContext } from "../../context/context"
import { orders } from "../../data/orders"
import type { IUser } from "../../interfaces/user"

const Profile = () => {
  const { user } = useAppContext().auth
  const userOrders = orders.filter(order => order.userId === user?.id)

  return (
    <>
      <User user={user as IUser} />
      <Orders orders={userOrders} />
    </>
  )
}

export default Profile