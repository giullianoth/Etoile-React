import { useEffect, type Dispatch, type SetStateAction } from "react"
import { useAppContext } from "../../../../context/context"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import type { IOrderItem } from "../../../../types/order"
import Loading from "../../../Loading"

type Props = {
  orderItem: IOrderItem
  onCloseModal: Dispatch<SetStateAction<boolean>>
  onConfirmCancel: () => void
}

const ConfirmCancelItem = ({ onConfirmCancel, onCloseModal, orderItem }: Props) => {
  const { addMessage } = useAppContext().message

  const {
    loading,
    success,
    successMessage,
    errorMessage,
    // handleClearOrderFormFields,
    handleCancelOrderItem
  } = useAppContext().orders

  // useEffect(() => {
  //   handleClearOrderFormFields()
  // }, [orderItem])

  useEffect(() => {
    if (errorMessage) {
      addMessage(errorMessage, "error")
    }

    if (success && successMessage) {
      addMessage(successMessage)
    }
  }, [errorMessage, successMessage, success, handleCancelOrderItem])

  const handleConfirmCancelItem = async () => {
    await handleCancelOrderItem(orderItem._id)
    onConfirmCancel()
  }

  return (
    <Popup>
      <div className={styles.popup__heading}>
        <h2>Cancelar este item?</h2>
      </div>

      <div className={`${styles.popup__action} ${styles.popup__centered}`}>
        <button
          className="button primary outline"
          onClick={() => onCloseModal(false)}>Não</button>

        <button
          className="button primary"
          disabled={loading}
          onClick={handleConfirmCancelItem}>
          Sim
          {loading && <Loading inButton />}
        </button>
      </div>
    </Popup>
  )
}

export default ConfirmCancelItem