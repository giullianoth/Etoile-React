import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"

type Props = {
    onCloseDelete: () => void
}

const DeleteOrder = ({ onCloseDelete }: Props) => {
    const handleConfirmDelete = async () => {
        onCloseDelete()
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Excluir pedido?</h2>
            </div>

            <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                <button
                    className="button primary outline"
                    onClick={onCloseDelete}>Não</button>

                <button
                    className="button primary"
                    onClick={handleConfirmDelete}>
                    Sim
                </button>
            </div>
        </Popup>
    )
}

export default DeleteOrder