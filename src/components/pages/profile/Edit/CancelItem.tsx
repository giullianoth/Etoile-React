import { type MouseEventHandler } from 'react'
import styles from "./Edit.module.css"

type Props = {
    onConfirmCancel?: MouseEventHandler
    onCancel?: MouseEventHandler
}

const CancelItem = ({ onCancel, onConfirmCancel }: Props) => {
    return (
        <section className={styles.edit}>
            <header className={`section-heading ${styles.edit__title}`}>
                <h2>Cancelar item do pedido?</h2>
            </header>

            <p>Seu pedido de cancelamento será analisado, e caso aprovado, o reembolso ocorrerá em até 1 dia. Você receberá informações a respeito.</p>

            <div className={styles.edit__actions}>
                <button className="button primary outline" onClick={onCancel}>Não</button>
                <button className="button primary" onClick={onConfirmCancel}>Sim</button>
            </div>
        </section>
    )
}

export default CancelItem