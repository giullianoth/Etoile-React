import { useState } from "react"
import CartList from "../../components/pages/cart/CartList"
import PageTitle from "../../components/PageTitle"
import { useAppContext } from "../../context/context"
import Confirm from "../../components/pages/cart/Confirm/Confirm"
import Modal from "react-modal"

const Cart = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const { cart } = useAppContext().cart

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
        <Confirm onCancel={() => setModalIsOpen(false)} />
      </Modal>
    </>
  )
}

export default Cart