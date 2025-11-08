import { useAppContext } from "../../context/context"
import User from "../../components/pages/profile/User"
import type { IUser } from "../../types/user"
import { useEffect } from "react"
import Orders from "../../components/pages/profile/Orders"
import Trigger from "../../components/Trigger"

const Profile = () => {
  const { triggerMessage, showTrigger, triggerIsVisible, triggerIsFading } = useAppContext().message

  useEffect(() => {
    if (triggerMessage) {
      showTrigger()
    }
  }, [])

  return (
    <>
      {/* <User user={user as IUser} />
      <Orders orders={ordersState.orders} /> */}

      {triggerIsVisible &&
        <Trigger
          type="success"
          floating
          fading={triggerIsFading}>{triggerMessage}</Trigger>}
    </>
  )
}

export default Profile