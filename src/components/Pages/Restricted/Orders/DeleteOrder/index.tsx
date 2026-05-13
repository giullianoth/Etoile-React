import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"

type Props = {
    onCloseDelete: () => void
    title: string
}

const DeleteOrder = ({ onCloseDelete, title }: Props) => {
    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>{title}</h2>
            </div>

            <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                <button
                    className="button primary outline"
                    onClick={onCloseDelete}>Não</button>

                <button
                    className="button primary">
                    Sim
                </button>
            </div>
        </Popup>
    )
}

export default DeleteOrder