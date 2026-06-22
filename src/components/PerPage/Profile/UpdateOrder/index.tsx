import { PiCheckBold, PiTrash, PiX } from "react-icons/pi"
import { useAppContext } from "../../../../context/app-context"
import { uploadsURL } from "../../../../services/api"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import Trigger from "../../../Trigger"
import { useEffect, useState, type FormEvent } from "react"
import Checkbox from "../../../Form/Checkbox"
import { useDateFormats } from "../../../../hooks/date-formats"
import type { IOrderItem } from "../../../../types/order"
import Loading from "../../../Loading"

type Props = {
    onClosePopup: () => void
}

const UpdateOrder = ({ onClosePopup }: Props) => {
    const [time, setTime] = useState<string>("")
    const [orderReceived, setOrderReceived] = useState<boolean>(false)
    const [cancelItemIsOpen, setCancelItemIsOpen] = useState<boolean>(false)
    const [cancelOrderIsOpen, setCancelOrderIsOpen] = useState<boolean>(false)
    const [itemToCancel, setItemToCancel] = useState<IOrderItem | null>(null)
    const { timeFormat, combineDateAndTime } = useDateFormats()
    const { addMessage } = useAppContext().message

    const {
        currentOrder,
        handleResetOrdersMessage,
        cancellingOrderItem,
        mutateErrorMessage,
        handleCancelOrderItem,
        handleUpdateOrder,
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        handleCancelOrder,
    } = useAppContext().orders

    useEffect(() => {
        const initializeTimeField = () => {
            if (currentOrder) {
                setTime(timeFormat(currentOrder.time))
            }
        }

        initializeTimeField()
        return () => handleResetOrdersMessage()
    }, [currentOrder, timeFormat, handleResetOrdersMessage])

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            onClosePopup()
        }
    }, [addMessage, mutateSuccess, mutateSuccessMessage, onClosePopup])

    const handleSetItemToCancel = (orderItem: IOrderItem) => {
        setCancelItemIsOpen(true)
        setItemToCancel(orderItem)
    }

    const handleCloseCancelItem = () => {
        setCancelItemIsOpen(false)
        setItemToCancel(null)
    }

    const handleCancelItem = async (orderItemId: string) => {
        await handleCancelOrderItem(orderItemId)
        handleCloseCancelItem()
    }

    const handleCancelCurrentOrder = async () => {
        if (!currentOrder) {
            return
        }

        await handleCancelOrder(currentOrder._id)
    }

    const handleSubmitAndUpdateOrder = async (event: FormEvent) => {
        event.preventDefault()

        if (!currentOrder) {
            return
        }

        const combinedDate = combineDateAndTime(currentOrder.time, time)
        await handleUpdateOrder({ time: combinedDate, orderReceived }, currentOrder._id)
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Editar pedido</h2>
            </div>

            {currentOrder
                ? currentOrder.orderItems.length > 0 &&
                <>
                    <div className={styles.popup_list}>
                        {currentOrder.orderItems.map(orderItem => (
                            <div
                                key={orderItem._id}
                                className={styles.popup__listItem}>
                                <div className={styles.popup__listImage}>
                                    <img
                                        src={
                                            orderItem.itemDetails.image
                                                ? `${uploadsURL}/plates/${orderItem.itemDetails.image}`
                                                : "/images/no-image.jpg"
                                        }
                                        alt={orderItem.itemDetails.name} />
                                </div>

                                <div className={styles.popup__listInfo}>
                                    <p className={styles.popup__listName}>
                                        <strong>{orderItem.itemDetails.name}</strong>
                                    </p>

                                    <p className={styles.popup__listDetails}>
                                        <strong>Porções:</strong>{" "}
                                        {orderItem.quantity}
                                    </p>
                                </div>

                                {currentOrder.orderItems.length > 1 &&
                                    <div className={styles.popup__listAction}>
                                        {cancelItemIsOpen && itemToCancel?._id === orderItem._id
                                            ? <div className={styles.popup__action}>
                                                {cancellingOrderItem
                                                    ? <Loading small />

                                                    : <>
                                                        <button
                                                            type="button"
                                                            className="button clear"
                                                            title="Voltar"
                                                            onClick={handleCloseCancelItem}
                                                            disabled={cancelOrderIsOpen || cancellingOrderItem || mutating}>
                                                            <PiX />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="button clear"
                                                            title="Cancelar este item"
                                                            onClick={() => handleCancelItem(orderItem._id)}
                                                            disabled={cancelOrderIsOpen || cancellingOrderItem || mutating}>
                                                            <PiCheckBold />
                                                        </button>
                                                    </>}
                                            </div>

                                            : <button
                                                type="button"
                                                className="button primary clear"
                                                title="Cancelar este item"
                                                onClick={() => handleSetItemToCancel(orderItem)}
                                                disabled={cancelOrderIsOpen || cancellingOrderItem || mutating}>
                                                <PiTrash />
                                            </button>}
                                    </div>}
                            </div>
                        ))}
                    </div>

                    <form className={styles.popup__form} onSubmit={handleSubmitAndUpdateOrder}>
                        <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
                            <input
                                required
                                type="time"
                                name="time"
                                value={time || ""}
                                onChange={event => setTime(event.target.value)}
                                disabled={cancelItemIsOpen || cancelOrderIsOpen || cancellingOrderItem} />

                            <p>
                                <strong className={styles.popup__strongDetached}>Atenção:</strong>{" "}
                                Não é possível selecionar horário anterior ao já selecionado.
                            </p>
                        </div>

                        <label className={styles.popup__checkField}>
                            <Checkbox
                                name="orderReceived"
                                checked={orderReceived}
                                onChange={event => setOrderReceived(event.target.checked)}
                                disabled={cancelItemIsOpen || cancelOrderIsOpen || cancellingOrderItem} />

                            <span>Recebi meu pedido</span>
                        </label>

                        <div
                            className={`${styles.popup__action} ${styles.popup__spaced} ${styles.popup__stretched} ${styles.popup__reverse}`}>
                            <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
                                <button
                                    type="button"
                                    className="button primary outline"
                                    onClick={onClosePopup}
                                    disabled={cancellingOrderItem || mutating}>
                                    Voltar
                                </button>

                                <button
                                    type="submit"
                                    className="button primary"
                                    disabled={cancelItemIsOpen || cancelOrderIsOpen || cancellingOrderItem || mutating}>
                                    Atualizar
                                    {mutating && <Loading inButton />}
                                </button>
                            </div>

                            <div className={styles.popup__action}>
                                {cancelOrderIsOpen
                                    ? <>
                                        <span className={styles.popup__subtitle}>Tem certeza?</span>

                                        <button
                                            type="button"
                                            className="button clear"
                                            title="Voltar"
                                            onClick={() => setCancelOrderIsOpen(false)}
                                            disabled={cancelItemIsOpen || cancellingOrderItem || mutating}>
                                            <PiX />
                                        </button>

                                        <button
                                            type="button"
                                            className="button clear"
                                            title="Cancelar pedido"
                                            onClick={handleCancelCurrentOrder}
                                            disabled={cancelItemIsOpen || cancellingOrderItem || mutating}>
                                            <PiCheckBold />
                                        </button>
                                    </>

                                    : <button
                                        type="button"
                                        className="button primary clear"
                                        onClick={() => setCancelOrderIsOpen(true)}
                                        disabled={cancelItemIsOpen || cancellingOrderItem || mutating}>
                                        <PiTrash />
                                        Cancelar pedido
                                    </button>}
                            </div>
                        </div>
                    </form>

                    {mutateErrorMessage && <Trigger type="error">{mutateErrorMessage}</Trigger>}
                </>

                : <Trigger type="error">Erro ao buscar pedido.</Trigger>}
        </Popup>
    )
}

export default UpdateOrder