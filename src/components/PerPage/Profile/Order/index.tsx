import { PiArrowsClockwise, PiCheckCircle, PiClock, PiNotePencil, PiTrash, PiWarningCircle, PiX } from "react-icons/pi"
import type { IOrder } from "../../../../types/order"
import styles from "./Order.module.css"
import type { IMessageType } from "../../../../types/message"
import Trigger from "../../../Trigger"
import { useDateFormats } from "../../../../hooks/date-formats"
import { uploadsURL } from "../../../../services/api"
import { useAppContext } from "../../../../context/app-context"

type Props = {
    onOpenUpdate: (order: IOrder) => void
    onOpenCancel: (order: IOrder) => void
    onOpenDelete: (order: IOrder) => void
    onOpenReorder: (order: IOrder) => void
    order: IOrder
}

type UpdateAction = "update" | "reorder"
type DeleteAction = "cancel" | "delete"

const STATUS_CONFIG = {
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

const Order = ({ order, onOpenUpdate, onOpenCancel, onOpenDelete, onOpenReorder }: Props) => {
    const currentStatus = STATUS_CONFIG[order.status]
    const { dateFormat, timeFormat } = useDateFormats()
    const { pastOrderMessage, cancelledOrderIds } = useAppContext().orders

    const actionButton = {
        label: order.status === "Pendente" ? "Editar" : "Pedir de novo",
        icon: order.status === "Pendente" ? <PiNotePencil /> : <PiArrowsClockwise />,
        action: (order.status === "Pendente" ? "update" : "reorder") as UpdateAction
    }

    const deleteButton = {
        label: order.status === "Pendente" ? "Cancelar Pedido" : "Excluir",
        icon: order.status === "Pendente" ? <PiX /> : <PiTrash />,
        action: (order.status === "Pendente" ? "cancel" : "delete") as DeleteAction
    }

    const handleActionClick = (action: UpdateAction) => {
        if (action === "update") {
            onOpenUpdate(order)
        }

        if (action === "reorder") {
            onOpenReorder(order)
        }
    }

    const handleDeleteClick = (action: DeleteAction) => {
        if (action === "cancel") {
            onOpenCancel(order)
        }

        if (action === "delete") {
            onOpenDelete(order)
        }
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
                    <strong>{timeFormat(order.time)}</strong>
                </p>

                <p>
                    Presença confirmada às{" "}
                    <strong>{dateFormat(order.time)}</strong>
                </p>
            </div>

            {order.orderItems.map(item => (
                <article key={item._id} className={styles.order__item}>
                    <div className={styles.order__itemImage}>
                        <img
                            src={item.itemDetails.image
                                ? `${uploadsURL}/plates/${item.itemDetails.image}`
                                : "/images/no-image.jpg"
                            }
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
                    role="button"
                    className={styles.order__button}
                    onClick={() => handleActionClick(actionButton.action)}>
                    <Trigger
                        bullet
                        type="info"
                        icon={actionButton.icon}>
                        {actionButton.label}
                    </Trigger>
                </div>

                <div
                    role="button"
                    className={styles.order__button}
                    onClick={() => handleDeleteClick(deleteButton.action)}>
                    <Trigger
                        bullet
                        type="error"
                        icon={deleteButton.icon}>
                        {deleteButton.label}
                    </Trigger>
                </div>
            </div>

            {pastOrderMessage && cancelledOrderIds.includes(order._id) &&
                <div className={styles.order__warning}>
                    <Trigger bullet type="warning">{pastOrderMessage}</Trigger>
                </div>}
        </article>
    )
}

export default Order