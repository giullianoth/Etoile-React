import { useEffect, useState, type FormEvent, type MouseEventHandler } from "react"
import styles from "./Edit.module.css"
import { PiTrash } from "react-icons/pi"
import Checkbox from "../../../Checkbox"
import type { IOrder } from "../../../../interfaces/order"
import { orderItems } from "../../../../data/order-items"
import OrderItem from "../OrderItem"

type Props = {
    onCancelOrder?: MouseEventHandler
    onCancelItem?: MouseEventHandler
    onClose?: MouseEventHandler
    order: IOrder
}

const EditOrder = ({ onCancelOrder, onCancelItem, onClose, order }: Props) => {
    const [time, setTime] = useState<string>("12:30")
    const [receipt, setReceipt] = useState<boolean>(false)
    const orderItemsToEdit = orderItems.filter(item => item.orderId === order.id)

    useEffect(() => {
        if (order) {
            setTime(order.time)
        }
    }, [order])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log({ time, receipt })
    }

    return (
        <section className={styles.edit}>
            <header className={`section-heading ${styles.edit__title}`}>
                <h2>Editar pedido</h2>
            </header>

            <div className={styles.edit__orders}>
                {orderItemsToEdit && orderItemsToEdit.map(item => (
                    <div key={`order-item-${item.id}`} className={styles.edit__order}>
                        <OrderItem orderItem={item} />

                        <button
                            className="button primary clear"
                            title="Cancelar este item"
                            onClick={onCancelItem}>
                            <PiTrash />
                        </button>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className={styles.edit__form}>
                <div className={styles.edit__formOrder}>
                    <input
                        type="time"
                        name="time"
                        value={time}
                        onChange={event => setTime(event.target.value)} />

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