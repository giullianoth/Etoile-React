import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"

type Props = {
    onCloseReorder: () => void
}

const Reorder = ({ onCloseReorder }: Props) => {
    const handleConfirmReorder = () => {
        onCloseReorder()
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Deseja pedir de novo?</h2>
            </div>

            <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                <button
                    className="button primary outline"
                    onClick={onCloseReorder}>Não</button>

                <button
                    className="button primary"
                    onClick={handleConfirmReorder}>Sim</button>
            </div>
        </Popup>
    )
}

export default Reorder