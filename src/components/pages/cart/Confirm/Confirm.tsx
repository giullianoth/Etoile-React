import { useState, type FormEvent } from "react"
import styles from "./Confirm.module.css"
import { useAppContext } from "../../../../context/context"
import type { IOrder, IOrderItem } from "../../../../interfaces/order"
import { users } from "../../../../data/users"

type Props = {
    onCancel: () => void
}

const Confirm = ({ onCancel }: Props) => {
    const [time, setTime] = useState<string>("")
    const { cart } = useAppContext().cart
    const user = users[0]

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()

        const order: IOrder = {
            id: 1,
            userId: user.id,
            time,
            status: "Pendente"
        }

        const orderItems: IOrderItem[] = cart.map((item, index) => ({
            id: index + 1,
            plateId: item.plateId,
            orderId: order.id,
            quantity: item.quantity
        }))

        console.log(order, ...orderItems)
        onCancel()
    }

    return (
        <section className={styles.confirm}>
            <header className={styles.confirm__title}>
                <h3>Quase lá</h3>
            </header>

            <p className={styles.confirm__text}>
                Confirme seu pedido para a seguinte data: <strong>18/02/2025</strong>. Qual horário você virá para a refeição?
            </p>

            <form className={styles.confirm__form} onSubmit={handleSubmit}>
                <input
                    type="time"
                    name="time"
                    value={time}
                    onChange={event => setTime(event.target.value)} />

                <div className={styles.confirm__actions}>
                    <span className="button primary outline" onClick={onCancel}>Cancelar</span>
                    <button type="submit" className="button primary">Confirmar</button>
                </div>
            </form>
        </section>
    )
}

export default Confirm