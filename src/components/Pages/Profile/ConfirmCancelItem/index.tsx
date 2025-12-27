import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"

type Props = {
  onCloseModal: () => void
  onConfirmCancel: () => void
}

const ConfirmCancelItem = ({ onConfirmCancel, onCloseModal }: Props) => {
  return (
    <Popup>
      <div className={styles.popup__heading}>
        <h2>Cancelar este item?</h2>
      </div>

      <div className={`${styles.popup__action} ${styles.popup__centered}`}>
        <button
          className="button primary outline"
          onClick={onCloseModal}>Não</button>

        <button
          className="button primary"
          onClick={onConfirmCancel}>Sim</button>
      </div>
    </Popup>
  )
}

export default ConfirmCancelItem