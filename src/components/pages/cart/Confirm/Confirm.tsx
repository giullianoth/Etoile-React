import { useState, type FormEvent } from "react"
import styles from "./Confirm.module.css"
import Trigger from "../../../Trigger"

type Props = {
    onCancel: () => void
}

const Confirm = ({ onCancel }: Props) => {
    const [time, setTime] = useState<string>("")
    const [localErrorMessage, setLocalErrorMessage] = useState<string | null>(null)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (!time) {
            setLocalErrorMessage("Selecione o horário de comparecimento.")
            return
        }

        console.log(time)
    }

    return (
        <section className={styles.confirm}>
            <div className={styles.confirm__container}>
                <header className={styles.confirm__title}>
                    <h3>Quase lá</h3>
                </header>

                <p className={styles.confirm__text}>
                    Confirme seu pedido para a seguinte data: <strong>18/02/2025</strong>. Qual horário você virá para a refeição?
                </p>

                <form className={styles.confirm__form} onSubmit={handleSubmit}>
                    <input
                        required
                        type="time"
                        name="time"
                        value={time}
                        onChange={event => setTime(event.target.value)} />

                    <div className={styles.confirm__actions}>
                        <span className="button primary outline" onClick={onCancel}>Cancelar</span>
                        <button type="submit" className="button primary">
                            Confirmar
                        </button>
                    </div>
                </form>

                {localErrorMessage &&
                    <Trigger
                        className={styles.confirm__message}
                        type="error">{localErrorMessage}</Trigger>}
            </div>
        </section>
    )
}

export default Confirm