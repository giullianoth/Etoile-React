import Orders from "../../components/pages/profile/Orders"
import User from "../../components/pages/profile/User"
import { orders } from "../../data/orders"
import { users } from "../../data/users"

const Profile = () => {
  const user = users[0]
  const userOrders = orders.filter(order => order.userId === user.id)

  return (
    <>
      <User user={user} />
      <Orders orders={userOrders} />
    </>
  )
}

export default Profile