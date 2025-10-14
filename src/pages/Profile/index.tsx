import { useAppContext } from "../../context/context"
import User from "../../components/pages/profile/User"
import type { IUser } from "../../interfaces/user"

const Profile = () => {
  const { user } = useAppContext().auth.authState

  return (
    <>
      <h1>perfil</h1>
      <User user={user as IUser} />
      {/* <Orders orders={orders} /> */}
    </>
  )
}

export default Profile