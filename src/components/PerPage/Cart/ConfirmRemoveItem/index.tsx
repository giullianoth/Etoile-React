import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"

type Props = {
    onCancelRemove: () => void
    onRemoveItem: () => void
}

const ConfirmRemove = ({ onCancelRemove, onRemoveItem }: Props) => {
    return (
        <Popup>
            <header className={styles.popup__header}>
                <h2>Deseja excluir este prato do carrinho?</h2>
            </header>

            <div className={`${styles.popup__action} ${styles.popup__centered}`}>
                <button
                    className="button primary outline"
                    onClick={onCancelRemove}>Não</button>

                <button
                    className="button primary"
                    onClick={onRemoveItem}>Sim</button>
            </div>
        </Popup>
    )
}

export default ConfirmRemove