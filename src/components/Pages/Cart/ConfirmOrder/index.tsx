import styles from "../../../Popup/Popup.module.css"
import Popup from "../../../Popup"
import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react"
import { useAppContext } from "../../../../context/context"
import type { IOrderCreate } from "../../../../types/order"
import { useDateFormats } from "../../../../hooks/date-formats"
import { useNavigate } from "react-router-dom"
import Loading from "../../../Loading"
import Trigger from "../../../Trigger"
import { usePendingOrder } from "../../../../hooks/pending-order"

type Props = {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

const ConfirmOrder = ({ setModalIsOpen }: Props) => {
    const [date, setDate] = useState<Date | null>(null)
    const [localErrorMessage, setLocalErrorMessage] = useState<string | null>(null)

    const {
        orderFormFields,
        handleChangeOrderFormFields,
        handleCreateOrder,
        loading,
        errorMessage,
        success,
        successMessage,
        handleClearOrderFormFields
    } = useAppContext().orders

    const { user } = useAppContext().auth
    const { cart, clearCart } = useAppContext().cart
    const { combineDateAndTime, isPastDate } = useDateFormats()
    const { addMessage } = useAppContext().message
    const { addPendingOrder } = usePendingOrder()
    const navigate = useNavigate()

    useEffect(() => {
        setDate(new Date())
        handleClearOrderFormFields()

        if (user?._id) {
            handleChangeOrderFormFields("userId", user._id)
        }
    }, [])

    useEffect(() => {
        if (success && successMessage) {
            addMessage(successMessage)
            navigate("/perfil")
        }
    }, [handleCreateOrder, success, successMessage])

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        handleChangeOrderFormFields(
            event.target.name as keyof IOrderCreate,
            event.target.value
        )
    }

    const handleConfirmOrder = async (event: FormEvent) => {
        event.preventDefault()

        const combinedDateValue = orderFormFields.time
            ? combineDateAndTime(date, orderFormFields.time)
            : null

        const orderItems: IOrderCreate["items"] = cart.map(item => ({
            plateId: item.plate._id,
            quantity: item.quantity
        }))

        if (!orderFormFields.userId) {
            if (!orderFormFields.time || !combinedDateValue) {
                setLocalErrorMessage("Preencha o horário de comparecimento.")
                return
            }

            if (combinedDateValue && isPastDate(combinedDateValue)) {
                setLocalErrorMessage("Hora inválida.")
                return
            }

            addPendingOrder({
                items: orderItems,
                time: combinedDateValue
            })

            navigate("/autenticacao")
            return
        }

        await handleCreateOrder(orderItems, combinedDateValue!)
        clearCart()
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
                    value={orderFormFields.time as string}
                    onChange={handleChangeFormData} />

                <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
                    <span
                        className="button primary outline"
                        onClick={() => setModalIsOpen(false)}>
                        Cancelar
                    </span>

                    <button type="submit" className="button primary" disabled={loading}>
                        Confirmar
                        {loading && <Loading inButton />}
                    </button>
                </div>
            </form>

            {errorMessage || localErrorMessage &&
                <Trigger type="error">{errorMessage ?? localErrorMessage}</Trigger>}
        </Popup>
    )
}

export default ConfirmOrder