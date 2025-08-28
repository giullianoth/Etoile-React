import { useState, type FormEvent, type MouseEventHandler } from "react"
import styles from "./Edit.module.css"
import { PiTrash } from "react-icons/pi"
import Checkbox from "../../../Checkbox"

type Props = {
    onCancelOrder?: MouseEventHandler
    onCancelItem?: MouseEventHandler
    onClose?: MouseEventHandler
}

const EditOrder = ({ onCancelOrder, onCancelItem, onClose }: Props) => {
    const [pickupTime, setPickupTime] = useState<string>("12:30")
    const [receipt, setReceipt] = useState<boolean>(false)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log({ pickupTime, receipt })
    }

    return (
        <section className={styles.edit}>
            <header className={`section-heading ${styles.edit__title}`}>
                <h2>Editar pedido</h2>
            </header>

            <div className={styles.edit__orders}>
                <article className={styles.edit__order}>
                    <div className={styles.edit__orderImage}>
                        <img src="/images/presentation-image-1.jpg" alt="Shrimp and Vegetable Salad" />
                    </div>

                    <div className={styles.edit__orderInfo}>
                        <header className={styles.edit__orderName}>
                            <h3>Shrimp and Vegetable Salad</h3>
                        </header>

                        <p className={styles.edit__orderPortions}>
                            <strong>Porções:</strong> 2
                        </p>
                    </div>

                    <button
                        className="button primary clear"
                        title="Cancelar este item"
                        onClick={onCancelItem}>
                        <PiTrash />
                    </button>
                </article>

                <article className={styles.edit__order}>
                    <div className={styles.edit__orderImage}>
                        <img src="/images/presentation-image-1.jpg" alt="Shrimp and Vegetable Salad" />
                    </div>

                    <div className={styles.edit__orderInfo}>
                        <header className={styles.edit__orderName}>
                            <h3>Shrimp and Vegetable Salad</h3>
                        </header>

                        <p className={styles.edit__orderPortions}>
                            <strong>Porções:</strong> 2
                        </p>
                    </div>

                    <button
                        className="button primary clear"
                        title="Cancelar este item"
                        onClick={onCancelItem}>
                        <PiTrash />
                    </button>
                </article>
            </div>

            <form onSubmit={handleSubmit} className={styles.edit__form}>
                <div className={styles.edit__formOrder}>
                    <input
                        type="time"
                        name="pickupTime"
                        value={pickupTime}
                        onChange={event => setPickupTime(event.target.value)} />

                    <p>
                        <strong>Atenção:</strong> Não é possível selecionar horário anterior ao já selecionado.
                    </p>
                </div>

                <label className={styles.edit__formCheck}>
                    <Checkbox
                        name="receipt"
                        checked={receipt}
                        onChange={event => setReceipt(event.target.checked)} />

                    <span>Recebi meu pedido</span>
                </label>

                <div className={`${styles.edit__formSubmit} ${styles.edit__formOrderSubmit}`}>
                    <div>
                        <span
                            className="button primary outline"
                            onClick={onClose}>Cancelar</span>

                        <button type="submit" className="button primary">Atualizar</button>
                    </div>

                    <p>
                        <span
                            className={`button primary clear ${styles.edit__formOrderCancel}`}
                            onClick={onCancelOrder}>
                            <PiTrash />
                            Cancelar pedido
                        </span>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default EditOrder