import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/app-context"
import { useEffect } from "react"
import User from "../../components/PerPage/Profile/User"
import Orders from "../../components/PerPage/Profile/Orders"
import { usePendingOrder } from "../../hooks/pending-order"

const Profile = () => {
  const navigate = useNavigate()
  const { user, token, authenticated } = useAppContext().auth
  const { addMessage } = useAppContext().message

  const {
    pendingOrderMessage,
    pendingOrderMessageType,
    clearPendingOrderMessage,
  } = usePendingOrder()

  useEffect(() => {
    if (!authenticated || !user || !token) {
      navigate("/autenticar")
    }
  }, [authenticated, navigate, token, user])

  useEffect(() => {
    if (pendingOrderMessage) {
      addMessage(pendingOrderMessage, pendingOrderMessageType)
      clearPendingOrderMessage()
    }
  }, [addMessage, clearPendingOrderMessage, pendingOrderMessage, pendingOrderMessageType])

  return (
    <>
      <User />
      <Orders />
    </>
  )
}

export default Profile