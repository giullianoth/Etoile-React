import { PiCheckBold, PiTrash, PiX } from "react-icons/pi"
import type { IOrderItem, IOrderUpdate } from "../../../../types/order"
import Checkbox from "../../../Form/Checkbox"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import { useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react"
import { useAppContext } from "../../../../context/context"
import Trigger from "../../../Trigger"
import { useDateFormats } from "../../../../hooks/date-formats"
import Loading from "../../../Loading"

type Props = {
  setUpdateIsOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateOrder = ({ setUpdateIsOpen }: Props) => {
  const [itemToCancel, setItemToCancel] = useState<IOrderItem | null>(null)
  const [cancelItemIsOpen, setCancelItemIsOpen] = useState<boolean>(false)
  const [cancelItemLoading, setCancelItemLoading] = useState<boolean>(false)
  const { dateTimeFormat } = useDateFormats()

  const {
    currentOrder,
    orderFormFields,
    handleChangeOrderFormFields,
    handleCancelOrderItem,
    errorMessage,
    loading
  } = useAppContext().orders

  const handleCloseCancel = () => {
    setCancelItemIsOpen(false)
    setItemToCancel(null)
  }

  const handleSetItemToCancel = (orderItem: IOrderItem) => {
    setCancelItemIsOpen(true)
    setItemToCancel(orderItem)
  }

  const handleCancelItem = async () => {
    if (!itemToCancel?._id) {
      return
    }

    setCancelItemLoading(true)
    await handleCancelOrderItem(itemToCancel?._id)
    
    setCancelItemIsOpen(false)
    setItemToCancel(null)
    setCancelItemLoading(false)
  }

  const handleChangeOrderData = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeOrderFormFields(
      event.target.name as keyof IOrderUpdate,
      event.target.name === "orderReceived" ? event.target.checked : event.target.value
    )
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <Popup>
      <div className={styles.popup__heading}>
        <h2>Editar pedido</h2>
      </div>

      {currentOrder
        ? <>
          <div className={styles.popup_list}>
            {currentOrder.orderItems.map(item => (
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

                {currentOrder.orderItems.length > 1 &&
                  <div className={styles.popup__listAction}>
                    {cancelItemIsOpen && itemToCancel?._id === item._id
                      ? <span className={styles.popup__action}>
                        <span
                          className="button clear"
                          title="Voltar"
                          onClick={handleCloseCancel}>
                          <PiX />
                        </span>

                        <span
                          className="button clear"
                          title="Cancelar este item"
                          onClick={handleCancelItem}>
                          <PiCheckBold />
                        </span>

                        {loading && cancelItemLoading &&
                          <Loading className={styles.popup__listLoading} small />}
                      </span>

                      : <span
                        className="button primary clear"
                        title="Cancelar este item"
                        onClick={() => handleSetItemToCancel(item)}>
                        <PiTrash />
                      </span>}
                  </div>}
              </div>
            ))}
          </div>

          <form className={styles.popup__form} onSubmit={handleSubmit}>
            <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
              <input
                type="time"
                name="time"
                value={dateTimeFormat(orderFormFields.time!)}
                onChange={handleChangeOrderData} />

              <p>
                <strong className={styles.popup__strongDetached}>Atenção:</strong>{" "}
                Não é possível selecionar horário anterior ao já selecionado.
              </p>
            </div>

            <label className={styles.popup__checkField}>
              <Checkbox
                name="orderReceived"
                checked={orderFormFields.orderReceived}
                onChange={handleChangeOrderData} />

              <span>Recebi meu pedido</span>
            </label>

            <div
              className={`${styles.popup__action} ${styles.popup__spaced} ${styles.popup__stretched} ${styles.popup__reverse}`}>
              <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
                <span
                  className="button primary outline"
                  onClick={() => setUpdateIsOpen(false)}>
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

          {errorMessage && <Trigger type="error">{errorMessage}</Trigger>}
        </>

        : <Trigger type="error">Erro ao carregar pedido.</Trigger>}
    </Popup>
  )
}

export default UpdateOrder