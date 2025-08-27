import { useState, type FormEvent, type MouseEventHandler } from "react"
import styles from "./Confirm.module.css"

type Props = {
    onCancel?: MouseEventHandler
}

const Confirm = ({ onCancel }: Props) => {
    const [pickupTime, setPickupTime] = useState<string>("")

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log({ pickupTime })
    }

    return (
        <section className={styles.confirm}>
            <header className={styles.confirm__title}>
                <h3>Quase lá</h3>
            </header>

            <p className={styles.confirm__text}>
                Confirme seu pedido para a seguinte data: <strong>18/02/2025</strong>. Qual horário você virá buscar seu pedido?
            </p>

            <form className={styles.confirm__form} onSubmit={handleSubmit}>
                <input
                    type="time"
                    name="pickupTime"
                    value={pickupTime}
                    onChange={event => setPickupTime(event.target.value)} />

                <div className={styles.confirm__actions}>
                    <span className="button primary outline" onClick={onCancel}>Cancelar</span>
                    <button type="submit" className="button primary">Confirmar</button>
                </div>
            </form>
        </section>
    )
}

export default Confirm