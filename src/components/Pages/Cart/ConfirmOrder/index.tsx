import styles from "../../../Popup/Popup.module.css"
import Popup from "../../../Popup"
import { useEffect, useState, type FormEvent } from "react"

type Props = {
    onCancelConfirmOrder: () => void
}

const ConfirmOrder = ({ onCancelConfirmOrder }: Props) => {
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")

    useEffect(() => {
        setDate(new Date().toLocaleDateString())
    }, [])

    const handleConfirmOrder = async (event: FormEvent) => {
        event.preventDefault()
        onCancelConfirmOrder()
        console.log({ date, time })
    }

    return (
        <Popup>
            <header className={styles.popup__heading}>
                <h2>Quase lá!</h2>
            </header>

            <p className={styles.popup__regularText}>
                Confirme seu pedido para esta data: <strong>{date}</strong>.{" "}
                A que horas você comparecerá?
            </p>

            <form
                onSubmit={handleConfirmOrder}
                className={`${styles.popup__action} ${styles.popup__spaced} ${styles.popup__stretched}`}>
                <input
                    type="time"
                    name="time"
                    value={time}
                    onChange={event => setTime(event.target.value)} />

                <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
                    <button
                        type="button"
                        className="button primary outline"
                        onClick={onCancelConfirmOrder}>
                        Cancelar
                    </button>

                    <button type="submit" className="button primary">
                        Confirmar
                    </button>
                </div>
            </form>
        </Popup>
    )
}

export default ConfirmOrder