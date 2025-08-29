import type { MouseEventHandler } from "react"
import styles from "./Confirm.module.css"

type Props = {
    onConfirm?: MouseEventHandler
    onCancel?: MouseEventHandler
}

const RemoveCartItem = ({ onCancel, onConfirm }: Props) => {
    return (
        <section className={styles.confirm}>
            <header className={`section-heading ${styles.confirm__titleRemove}`}>
                <h2>Remover item?</h2>
            </header>

            <div className={styles.confirm__actions}>
                <button
                    className="button primary outline"
                    onClick={onCancel}>Não</button>

                <button
                    className="button primary"
                    onClick={onConfirm}>Sim</button>
            </div>
        </section>
    )
}

export default RemoveCartItem