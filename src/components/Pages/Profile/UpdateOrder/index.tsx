import { PiCheckBold, PiTrash, PiX } from "react-icons/pi"
import Checkbox from "../../../Form/Checkbox"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import { useEffect, useState, type FormEvent } from "react"
import { useAppContext } from "../../../../context/app-context"
import { uploadsURL } from "../../../../services/api"
import { useDateFormats } from "../../../../hooks/date-formats"
import Trigger from "../../../Trigger"
import type { IOrderItem } from "../../../../types/order"
import Loading from "../../../Loading"

type Props = {
  onCloseUpdate: () => void
}

const UpdateOrder = ({ onCloseUpdate }: Props) => {
  const [cancelItemIsOpen, setCancelItemIsOpen] = useState<boolean>(false)
  const [cancelOrderIsOpen, setCancelOrderIsOpen] = useState<boolean>(false)
  const [time, setTime] = useState<string>("")
  const [orderReceived, setOrderReceived] = useState<boolean>(false)
  const [itemToCancel, setItemToCancel] = useState<IOrderItem | null>(null)
  const { timeFormat } = useDateFormats()
  const { addMessage } = useAppContext().message

  const {
    currentOrder,
    handleCancelOrderItem,
    cancellingOrderItem,
    success,
    successMessage,
    errorMessage,
    handleResetOrdersMessage,
    loading,
    handleCancelOrder,
    handleUpdateOrder,
  } = useAppContext().orders

  useEffect(() => {
    return () => handleResetOrdersMessage()
  }, [handleResetOrdersMessage])

  useEffect(() => {
    if (currentOrder) {
      setTime(timeFormat(currentOrder.time))
    }
  }, [currentOrder, timeFormat])

  useEffect(() => {
    if (success && successMessage) {
      addMessage(successMessage)
    }
  }, [addMessage, success, successMessage])

  const handleCloseCancel = () => {
    setCancelItemIsOpen(false)
    setItemToCancel(null)
  }

  const handleSetItemToCancel = (orderItem: IOrderItem) => {
    setCancelItemIsOpen(true)
    setItemToCancel(orderItem)
  }

  const handleCancelItem = async (orderItemId: string) => {
    await handleCancelOrderItem(orderItemId)
    setCancelItemIsOpen(false)
    setItemToCancel(null)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!currentOrder) {
      return
    }

    await handleUpdateOrder(currentOrder._id, { orderReceived, time })
    onCloseUpdate()
  }

  const handleCancelCurrentOrder = async () => {
    if (!currentOrder) {
      return
    }

    await handleCancelOrder(currentOrder._id)
    onCloseUpdate()
  }

  return (
    <Popup>
      <div className={styles.popup__heading}>
        <h2>Editar pedido</h2>
      </div>

      {currentOrder && currentOrder.orderItems.length > 0 &&
        <div className={styles.popup_list}>
          {currentOrder.orderItems.map(orderItem => (
            <div
              key={orderItem._id}
              className={styles.popup__listItem}>
              <div className={styles.popup__listImage}>
                <img
                  src={
                    orderItem.itemDetails.image
                      ? `${uploadsURL}/plates/${orderItem.itemDetails.image}`
                      : "/images/no-image.jpg"
                  }
                  alt={orderItem.itemDetails.name} />
              </div>

              <div className={styles.popup__listInfo}>
                <p className={styles.popup__listName}>
                  <strong>{orderItem.itemDetails.name}</strong>
                </p>

                <p className={styles.popup__listDetails}>
                  <strong>Porções:</strong>{" "}
                  {orderItem.quantity}
                </p>
              </div>

              {currentOrder.orderItems.length > 1 &&
                <div className={styles.popup__listAction}>
                  {cancellingOrderItem && itemToCancel?._id === orderItem._id
                    ? <Loading small />

                    : cancelItemIsOpen && itemToCancel?._id === orderItem._id
                      ? <div className={styles.popup__action}>
                        <button
                          type="button"
                          className="button clear"
                          title="Voltar"
                          onClick={handleCloseCancel}
                          disabled={cancelOrderIsOpen || cancellingOrderItem || loading}>
                          <PiX />
                        </button>

                        <button
                          type="button"
                          className="button clear"
                          title="Cancelar este item"
                          onClick={() => handleCancelItem(orderItem._id)}
                          disabled={cancelOrderIsOpen || cancellingOrderItem || loading}>
                          <PiCheckBold />
                        </button>
                      </div>

                      : <button
                        type="button"
                        className="button primary clear"
                        title="Cancelar este item"
                        onClick={() => handleSetItemToCancel(orderItem)}
                        disabled={cancelOrderIsOpen || cancellingOrderItem || loading}>
                        <PiTrash />
                      </button>}
                </div>}
            </div>
          ))}
        </div>}

      <form className={styles.popup__form} onSubmit={handleSubmit}>
        <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
          <input
            type="time"
            name="time"
            value={time || ""}
            onChange={event => setTime(event.target.value)}
            disabled={cancelOrderIsOpen || cancellingOrderItem || loading} />

          <p>
            <strong className={styles.popup__strongDetached}>Atenção:</strong>{" "}
            Não é possível selecionar horário anterior ao já selecionado.
          </p>
        </div>

        <label className={styles.popup__checkField}>
          <Checkbox
            name="orderReceived"
            checked={orderReceived}
            onChange={event => setOrderReceived(event.target.checked)}
            disabled={cancelOrderIsOpen || cancellingOrderItem || loading} />

          <span>Recebi meu pedido</span>
        </label>

        <div
          className={`${styles.popup__action} ${styles.popup__spaced} ${styles.popup__stretched} ${styles.popup__reverse}`}>
          <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
            <button
              type="button"
              className="button primary outline"
              onClick={onCloseUpdate}
              disabled={cancelOrderIsOpen || cancelItemIsOpen || cancellingOrderItem || loading}>
              Voltar
            </button>

            <button
              type="submit"
              className="button primary"
              disabled={cancelOrderIsOpen || cancelItemIsOpen || cancellingOrderItem || loading}>
              Atualizar
              {loading && <Loading inButton />}
            </button>
          </div>

          <div className={styles.popup__action}>
            {cancelOrderIsOpen
              ? <>
                <span className={styles.popup__subtitle}>Tem certeza?</span>

                {loading
                  ? <Loading small />

                  : <>
                    <button
                      type="button"
                      className="button clear"
                      title="Voltar"
                      onClick={() => setCancelOrderIsOpen(false)}
                      disabled={cancelItemIsOpen || cancellingOrderItem || loading}>
                      <PiX />
                    </button>

                    <button
                      type="button"
                      className="button clear"
                      title="Cancelar pedido"
                      onClick={handleCancelCurrentOrder}
                      disabled={cancelItemIsOpen || cancellingOrderItem || loading}>
                      <PiCheckBold />
                    </button>
                  </>}
              </>

              : <button
                type="button"
                className="button primary clear"
                onClick={() => setCancelOrderIsOpen(true)}
                disabled={cancelItemIsOpen || cancellingOrderItem || loading}>
                <PiTrash />
                Cancelar pedido
              </button>}
          </div>
        </div>
      </form>

      {errorMessage && <Trigger type="error">{errorMessage}</Trigger>}
    </Popup>
  )
}

export default UpdateOrder