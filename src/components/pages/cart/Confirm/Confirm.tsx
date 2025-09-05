import { useEffect, useState, type FormEvent } from "react"
import styles from "./Confirm.module.css"
import { useAppContext } from "../../../../context/context"
import type { IOrder, IOrderItem } from "../../../../interfaces/order"
import { useNavigate } from "react-router-dom"
import { usePendingOrder } from "../../../../hooks/usePendingOrder"
import Trigger from "../../../Trigger"
import Loading from "../../../Loading"

type Props = {
    onCancel: () => void
}

const Confirm = ({ onCancel }: Props) => {
    const [time, setTime] = useState<string>("")
    const [localErrorMessage, setLocalErrorMessage] = useState<string | null>(null)
    const navigate = useNavigate()
    const { cart, clearCart } = useAppContext().cart
    const { user } = useAppContext().auth.authState
    const { pendingOrder, pendingOrderItems, setData, saveOrder } = usePendingOrder()
    const { ordersState, addOrder } = useAppContext().orders
    const { errorMessage, loading, success } = ordersState

    useEffect(() => {
        if (pendingOrder && pendingOrderItems.length) {
            saveOrder()
            navigate("/login")
        }
    }, [pendingOrder, pendingOrderItems])

    useEffect(() => {
        if (success) {
            clearCart()
            navigate("/perfil")
        }
    }, [ordersState])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (!time) {
            setLocalErrorMessage("Selecione o horário de comparecimento.")
            return
        }

        const orderItemsData: Partial<IOrderItem>[] = cart.map(item => ({
            plateId: item.plate._id,
            quantity: item.quantity
        }))

        const orderData: Partial<IOrder> = {
            time,
            status: "Pendente"
        }

        if (user) {
            orderData.userDetails = user
            await addOrder(orderData, orderItemsData)
        } else {
            setData(orderData, orderItemsData)
        }

        onCancel()
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
                        type="time"
                        name="time"
                        value={time}
                        onChange={event => setTime(event.target.value)} />

                    <div className={styles.confirm__actions}>
                        <span className="button primary outline" onClick={onCancel}>Cancelar</span>
                        <button type="submit" className="button primary" disabled={loading}>
                            Confirmar
                            {loading && <Loading inButton />}
                        </button>
                    </div>
                </form>

                {errorMessage &&
                    <Trigger
                        className={styles.confirm__message}
                        type="error">{errorMessage}</Trigger>}

                {localErrorMessage &&
                    <Trigger
                        className={styles.confirm__message}
                        type="error">{localErrorMessage}</Trigger>}
            </div>
        </section>
    )
}

export default Confirm