import { useEffect, useState } from "react"
import CartList from "../../components/pages/cart/CartList"
import PageTitle from "../../components/PageTitle"
import { useAppContext } from "../../context/context"
import Confirm from "../../components/pages/cart/Confirm/Confirm"
import Modal from "react-modal"
import type { IOrderRegister } from "../../types/order"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const { cart, clearCart } = useAppContext().cart
  const { authState } = useAppContext().auth
  const { ordersState, sendOrder, reset } = useAppContext().orders
  const navigate = useNavigate()

  useEffect(() => {
    reset()
  }, [])

  useEffect(() => {
    if (ordersState.success) {
      navigate("/perfil")
    }
  }, [ordersState])

  const handleConfirmOrder = async (time: string) => {
    const orderData: Partial<IOrderRegister> = {
      time,
      items: cart.map(item => ({
        plateId: item.plate._id,
        quantity: item.quantity
      }))
    }

    if (!authState.user?._id) {
      return
    }

    orderData.userId = authState.user._id
    await sendOrder(orderData)
    clearCart()
  }

  return (
    <>
      <PageTitle>Carrinho</PageTitle>

      <CartList
        cart={cart}
        onOpenConfirmModal={setModalIsOpen} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        closeTimeoutMS={300}
        className="modal"
        overlayClassName="modal-overlay">
        <Confirm
          onCancel={() => setModalIsOpen(false)}
          onConfirmOrder={handleConfirmOrder}
          loading={ordersState.loading} />
      </Modal>
    </>
  )
}

export default Cart