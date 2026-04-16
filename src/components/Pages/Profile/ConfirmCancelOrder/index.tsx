import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"

type Props = {
    onCloseCancel: () => void
}

const ConfirmCancelOrder = ({ onCloseCancel }: Props) => {
    const handleCancelCurrentOrder = async () => {
        onCloseCancel()
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Cancelar pedido?</h2>
            </div>

            <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                <button
                    className="button primary outline"
                    onClick={onCloseCancel}>Não</button>

                <button
                    className="button primary"
                    onClick={handleCancelCurrentOrder}>
                    Sim
                </button>
            </div>
        </Popup>
    )
}

export default ConfirmCancelOrder