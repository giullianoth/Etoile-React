import { useEffect, useState } from "react"
import PageHeading from "../../components/PageHeading"
import AuthComponent from "../../components/PerPage/Auth"
import { useAppContext } from "../../context/app-context"
import { useNavigate } from "react-router-dom"
import { usePendingOrder } from "../../hooks/pending-order"
import type { IOrderCreate } from "../../types/order"

const Auth = () => {
  const [title, setTitle] = useState<string>("Login")
  const { user, token, authenticated } = useAppContext().auth
  const navigate = useNavigate()
  const { pendingOrder, addPendingOrderMessage, removePendingOrder } = usePendingOrder()
  const { clearCart } = useAppContext().cart

  const {
    handleCreateOrder,
    mutating: creatingPendingOrder,
    mutateSuccess: pendingOrderCreated,
    mutateSuccessMessage: pendingOrderCreateSuccessMessage,
    mutateErrorMessage: pendingOrderNotCreated,
  } = useAppContext().orders

  useEffect(() => {
    if (pendingOrderCreated && pendingOrderCreateSuccessMessage) {
      addPendingOrderMessage(pendingOrderCreateSuccessMessage)
      clearCart()
      navigate("/perfil")
    }

    if (pendingOrderNotCreated) {
      addPendingOrderMessage("Seu pedido não foi registrado. Tente de novo.", "warning")
      navigate("/perfil")
    }
  }, [
    addPendingOrderMessage,
    clearCart,
    navigate,
    pendingOrderCreateSuccessMessage,
    pendingOrderCreated,
    pendingOrderNotCreated,
  ])

  useEffect(() => {
    const verifyPendingOrderAndRedirect = async () => {
      if (authenticated && user && token) {
        if (pendingOrder) {
          const orderData: Partial<IOrderCreate> = {
            ...pendingOrder,
            userId: user._id
          }

          await handleCreateOrder(orderData)
          removePendingOrder()
        } else {
          navigate("/perfil")
        }
      }
    }

    verifyPendingOrderAndRedirect()
  }, [authenticated, navigate, token, user, handleCreateOrder, pendingOrder, removePendingOrder])

  const handleChangeTitle = (titleValue: string) => {
    setTitle(titleValue)
  }

  return (
    <>
      <PageHeading title={title} />

      <AuthComponent
        onChangeTitle={handleChangeTitle}
        creatingPendingOrder={creatingPendingOrder} />
    </>
  )
}

export default Auth