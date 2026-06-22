import { useEffect, useState, type FormEvent } from "react"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import { useDateFormats } from "../../../../hooks/date-formats"
import Trigger from "../../../Trigger"
import type { IOrderCreate } from "../../../../types/order"
import { useAppContext } from "../../../../context/app-context"
import Loading from "../../../Loading"
import { useNavigate } from "react-router-dom"
import { usePendingOrder } from "../../../../hooks/pending-order"

type Props = {
    onClosePopup: () => void
}

const ConfirmOrder = ({ onClosePopup }: Props) => {
    const [date, setDate] = useState<Date | null>(null)
    const [time, setTime] = useState<string>("")
    const [localError, setLocalError] = useState<string | null>(null)
    const { combineDateAndTime } = useDateFormats()
    const { cart, clearCart } = useAppContext().cart
    const { user } = useAppContext().auth
    const { addMessage } = useAppContext().message
    const navigate = useNavigate()
    const { addPendingOrder } = usePendingOrder()

    const {
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleCreateOrder,
        handleResetOrdersMessage,
    } = useAppContext().orders

    useEffect(() => {
        const initializeDate = () => {
            const now = new Date()
            setDate(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())))
        }

        initializeDate()

        return () => {
            setDate(null)
            setLocalError(null)
            handleResetOrdersMessage()
        }
    }, [handleResetOrdersMessage])

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            onClosePopup()
            clearCart()
            navigate("/perfil")
        }
    }, [addMessage, mutateSuccess, mutateSuccessMessage, onClosePopup, navigate, clearCart])

    const handleConfirmOrder = async (event: FormEvent) => {
        event.preventDefault()
        const combinedDate = combineDateAndTime(date!, time)

        if (!combinedDate) {
            return setLocalError("Preencha corretamente o horário.")
        }

        const orderData: Partial<IOrderCreate> = {
            time: combinedDate,
            items: cart.map(item => ({
                plateId: item.plate._id,
                quantity: item.quantity
            }))
        }

        if (!user?._id) {
            addPendingOrder(orderData)
            navigate("/autenticar")
            return
        }

        orderData.userId = user._id
        await handleCreateOrder(orderData)
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
                    required
                    type="time"
                    name="time"
                    value={time || ""}
                    onChange={event => setTime(event.target.value)} />

                <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
                    <button
                        type="button"
                        className="button primary outline"
                        onClick={onClosePopup}
                        disabled={mutating}>
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="button primary"
                        disabled={mutating}>
                        Confirmar
                        {mutating && <Loading inButton />}
                    </button>
                </div>
            </form>

            {(localError || mutateErrorMessage) &&
                <Trigger type="error">{localError || mutateErrorMessage}</Trigger>}
        </Popup>
    )
}

export default ConfirmOrder