import Orders from "../../components/pages/profile/Orders"
import User from "../../components/pages/profile/User"
import { users } from "../../data/users"

const Profile = () => {
  const user = users[0]

  return (
    <>
      <User user={user} />
      <Orders />
    </>
  )
}

export default Profile