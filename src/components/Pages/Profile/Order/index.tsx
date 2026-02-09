import type { IOrder } from "../../../../types/order"
import styles from "./Order.module.css"
import type { IMessageType } from "../../../../types/message"
import { PiArrowsClockwise, PiCheckCircle, PiClock, PiNotePencil, PiTrash, PiWarningCircle, PiX } from "react-icons/pi"
import Trigger from "../../../Trigger"
import { useDateFormats } from "../../../../hooks/date-formats"
import { useEffect, useState } from "react"
import { useAppContext } from "../../../../context/context"

type Props = {
    order: IOrder
    onOpenUpdate: () => void
    onOpenCancel: () => void
    onOpenReorder: () => void
    onOpenDeleteOrder: () => void
}

const statusConfig = {
    Pendente: {
        icon: <PiClock />,
        type: "warning" as IMessageType
    },
    Cancelado: {
        icon: <PiWarningCircle />,
        type: "error" as IMessageType
    },
    Concluído: {
        icon: <PiCheckCircle />,
        type: "success" as IMessageType
    }
}

const Order = ({ order, onOpenUpdate, onOpenCancel, onOpenReorder, onOpenDeleteOrder }: Props) => {
    const { dateFormat, dateTimeFormat, isPastDate } = useDateFormats()
    const currentStatus = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.Pendente
    const [cancelledMessage, setCancelledMessage] = useState<boolean>(false)
    const [cancelledConfirm, setCancelledConfirm] = useState<boolean>(false)

    const { handleCancelOrder, loading, success } = useAppContext().orders

    const actionButton = {
        label: order.status === "Pendente" ? "Editar" : "Pedir de novo",
        icon: order.status === "Pendente" ? <PiNotePencil /> : <PiArrowsClockwise />
    }

    const deleteButton = {
        label: order.status === "Pendente" ? "Cancelar pedido" : "Excluir",
        icon: order.status === "Pendente" ? <PiX /> : <PiTrash />
    }

    useEffect(() => {
        const verifyPendingOrder = async () => {
            const currentDate = new Date()

            if (order.status === "Pendente" && isPastDate(order.time, currentDate)) {
                await handleCancelOrder(order._id)
                setCancelledConfirm(true)
            }
        }

        verifyPendingOrder()
    }, [handleCancelOrder, isPastDate, order._id, order.status, order.time])

    useEffect(() => {
        if (cancelledConfirm && success) {
            setCancelledMessage(true)
        }
    }, [cancelledConfirm, success, handleCancelOrder])

    const handleActionClick = () => {
        if (order.status === "Pendente") {
            onOpenUpdate()
            return
        }

        onOpenReorder()
    }

    const handleDeleteClick = () => {
        if (order.status === "Pendente") {
            onOpenCancel()
            return
        }

        onOpenDeleteOrder()
    }

    return (
        <article className={styles.order}>
            <div className={styles.order__status}>
                <Trigger type={currentStatus.type} icon={currentStatus.icon} bullet>
                    {order.status}
                </Trigger>
            </div>

            <div className={styles.order__date}>
                <p>
                    <strong>{dateFormat(order.time)}</strong>
                </p>

                <p>
                    Presença confirmada às{" "}
                    <strong>{dateTimeFormat(order.time)}</strong>
                </p>
            </div>

            {order.orderItems.map(item => (
                <article key={item._id} className={styles.order__item}>
                    <div className={styles.order__itemImage}>
                        <img
                            src={`/images/plates/${item.itemDetails.image}`}
                            alt={item.itemDetails.name} />
                    </div>

                    <div className={styles.order__itemInfo}>
                        <header className={styles.order__itemName}>
                            <h3>{item.itemDetails.name}</h3>
                        </header>

                        <p className={styles.order__itemPortions}>
                            <strong>Porções: {item.quantity}</strong>
                        </p>
                    </div>
                </article>
            ))}

            <div className={styles.order__actions}>
                <div
                    className={styles.order__button}
                    onClick={() => !loading && handleActionClick()}>
                    <Trigger
                        bullet
                        type="info"
                        icon={actionButton.icon}>
                        {actionButton.label}
                    </Trigger>
                </div>

                <div
                    className={styles.order__button}
                    onClick={() => !loading && handleDeleteClick()}>
                    <Trigger
                        bullet
                        type="error"
                        icon={deleteButton.icon}>
                        {deleteButton.label}
                    </Trigger>
                </div>
            </div>

            {cancelledMessage && <p>Pedido cancelado por exceder o prazo.</p>}
        </article>
    )
}

export default Order