import styles from "../../../Popup/Popup.module.css"
import Popup from "../../../Popup"
import { useEffect, useState, type FormEvent } from "react"
import { useAppContext } from "../../../../context/app-context"
import Loading from "../../../Loading"
import Trigger from "../../../Trigger"
import { useNavigate } from "react-router-dom"

type Props = {
    onCancelConfirmOrder: () => void
}

const ConfirmOrder = ({ onCancelConfirmOrder }: Props) => {
    const [time, setTime] = useState<string>("")
    const [date, setDate] = useState<Date | null>(null)
    const { cart, clearCart } = useAppContext().cart
    const { user } = useAppContext().auth
    const { addMessage } = useAppContext().message
    const navigate = useNavigate()

    const {
        handleCreateOrder,
        loading,
        success,
        successMessage,
        errorMessage,
        handleResetOrders
    } = useAppContext().orders

    useEffect(() => {
        setDate(new Date())

        return () => {
            setDate(null)
            handleResetOrders()
        }
    }, [handleResetOrders])

    useEffect(() => {
        if (success && successMessage) {
            addMessage(successMessage)
            handleResetOrders()
            clearCart()
            onCancelConfirmOrder()
            navigate("/perfil")
        }
    }, [
        addMessage,
        handleResetOrders,
        navigate,
        success,
        successMessage,
        onCancelConfirmOrder,
        clearCart
    ])

    const handleConfirmOrder = async (event: FormEvent) => {
        event.preventDefault()

        if (!cart) {
            return
        }

        const items = cart.map(item => ({ plateId: item.plate._id, quantity: item.quantity }))

        if (user) {
            await handleCreateOrder(items, date!, time, user._id)
        }
    }

    return (
        <Popup>
            <header className={styles.popup__heading}>
                <h2>Quase lá!</h2>
            </header>

            <p className={styles.popup__regularText}>
                Confirme seu pedido para esta data: <strong>{date?.toLocaleDateString()}</strong>.{" "}
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
                        onClick={onCancelConfirmOrder}
                        disabled={loading}>
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="button primary"
                        disabled={loading}>
                        Confirmar
                        {loading && <Loading inButton />}
                    </button>
                </div>
            </form>

            {errorMessage && <Trigger type="error">{errorMessage}</Trigger>}
        </Popup>
    )
}

export default ConfirmOrder