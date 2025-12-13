import type { Dispatch, SetStateAction } from "react"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"

type Props = {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
    onConfirmRemove: () => void
}

const ConfirmRemove = ({ onConfirmRemove, setModalIsOpen }: Props) => {
    return (
        <Popup>
            <header className={styles.popup__header}>
                <h2>Deseja excluir este prato do carrinho?</h2>
            </header>

            <div className={`${styles.popup__action} ${styles.popup__centered}`}>
                <button
                    className="button primary outline"
                    onClick={() => setModalIsOpen(false)}>Não</button>

                <button
                    className="button primary"
                    onClick={onConfirmRemove}>Sim</button>
            </div>
        </Popup>
    )
}

export default ConfirmRemove