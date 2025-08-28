import type { MouseEventHandler } from "react"
import styles from "./Edit.module.css"

type Props = {
    onDelete?: MouseEventHandler
    onCancel?: MouseEventHandler
}

const DeleteOrder = ({ onDelete, onCancel }: Props) => {
    return (
        <section className={styles.edit}>
            <header className={`section-heading ${styles.edit__title}`}>
                <h2>Excluir pedido?</h2>
            </header>

            <div className={styles.edit__actions}>
                <button className="button primary outline" onClick={onCancel}>Não</button>
                <button className="button primary" onClick={onDelete}>Sim</button>
            </div>
        </section>
    )
}

export default DeleteOrder