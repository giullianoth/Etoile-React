import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"

type Props = {
    onCloseSetAsCancelled: () => void
}

const SetAsCancelled = ({ onCloseSetAsCancelled }: Props) => {
    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Marcar pedidos como Cancelado?</h2>
            </div>

            <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                <button
                    className="button primary outline"
                    onClick={onCloseSetAsCancelled}>Não</button>

                <button
                    className="button primary">
                    Sim
                </button>
            </div>
        </Popup>
    )
}

export default SetAsCancelled