import { PiTrash } from "react-icons/pi"
import type { IOrderItem } from "../../../../types/order"
import Checkbox from "../../../Form/Checkbox"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import { useState, type Dispatch, type SetStateAction } from "react"
import Modal from "react-modal"
import ConfirmCancelItem from "../ConfirmCancelItem"

type Props = {
  orderItems: IOrderItem[]
  setUpdateIsOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateOrder = ({ orderItems, setUpdateIsOpen }: Props) => {
  const [itemToCancel, setItemToCancel] = useState<IOrderItem | null>(null)
  const [cancelItemIsOpen, setCancelItemIsOpen] = useState<boolean>(false)

  const handleCloseModal = () => {
    setUpdateIsOpen(false)
  }

  const handleSetItemToCancel = (orderItem: IOrderItem) => {
    setCancelItemIsOpen(true)
    setItemToCancel(orderItem)
  }

  const handleUnsetItemToCancel = () => {
    setCancelItemIsOpen(false)
    setItemToCancel(null)
  }

  const handleCancelItem = () => {
    console.log(itemToCancel)
    setItemToCancel(null)
    setCancelItemIsOpen(false)
  }

  return (
    <>
      <Popup>
        <div className={styles.popup__heading}>
          <h2>Editar pedido</h2>
        </div>

        <div className={styles.popup_list}>
          {orderItems.map(item => (
            <div
              key={item._id}
              className={styles.popup__listItem}>
              <div className={styles.popup__listImage}>
                <img src={`/images/plates/${item.itemDetails.image}`} alt={item.itemDetails.name} />
              </div>

              <div className={styles.popup__listInfo}>
                <p className={styles.popup__listName}>
                  <strong>{item.itemDetails.name}</strong>
                </p>

                <p className={styles.popup__listDetails}>
                  <strong>Porções:</strong>{" "}
                  {item.quantity}
                </p>
              </div>

              {orderItems.length > 1 &&
                <div className={styles.popup__listAction}>
                  <button
                    className="button primary clear"
                    title="Cancelar este item"
                    onClick={() => handleSetItemToCancel(item)}>
                    <PiTrash />
                  </button>
                </div>}
            </div>
          ))}
        </div>

        <form className={styles.popup__form}>
          <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
            <input
              type="time"
              name="time" />

            <p>
              <strong className={styles.popup__strongDetached}>Atenção:</strong>{" "}
              Não é possível selecionar horário anterior ao já selecionado.
            </p>
          </div>

          <label className={styles.popup__checkField}>
            <Checkbox
              name="confirmReceipt" />

            <span>Recebi meu pedido</span>
          </label>

          <div
            className={`${styles.popup__action} ${styles.popup__spaced} ${styles.popup__stretched} ${styles.popup__reverse}`}>
            <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
              <span
                className="button primary outline"
                onClick={handleCloseModal}>
                Voltar
              </span>

              <button type="submit" className="button primary">
                Atualizar
              </button>
            </div>

            <span className="button primary clear">
              <PiTrash />
              Cancelar pedido
            </span>
          </div>
        </form>
      </Popup>

      <Modal
        isOpen={cancelItemIsOpen}
        onRequestClose={handleUnsetItemToCancel}
        closeTimeoutMS={300}
        className="modal"
        overlayClassName="modal-overlay">
        <ConfirmCancelItem
          onCloseModal={handleUnsetItemToCancel}
          onConfirmCancel={handleCancelItem} />
      </Modal>
    </>
  )
}

export default UpdateOrder