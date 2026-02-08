import type { IOrder } from "../../../../types/order"
import styles from "./Order.module.css"
import type { IMessageType } from "../../../../types/message"
import { PiArrowsClockwise, PiCheckCircle, PiClock, PiNotePencil, PiTrash, PiWarningCircle, PiX } from "react-icons/pi"
import Trigger from "../../../Trigger"
import { useDateFormats } from "../../../../hooks/date-formats"

type Props = {
    order: IOrder
    onOpenUpdate: () => void
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

const Order = ({ order, onOpenUpdate }: Props) => {
    const { dateFormat, dateTimeFormat } = useDateFormats()
    const currentStatus = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.Pendente

    const actionButton = {
        label: order.status === "Pendente" ? "Editar" : "Pedir de novo",
        icon: order.status === "Pendente" ? <PiNotePencil /> : <PiArrowsClockwise />
    }

    const deleteButton = {
        label: order.status === "Pendente" ? "Cancelar pedido" : "Excluir",
        icon: order.status === "Pendente" ? <PiX /> : <PiTrash />
    }

    const handleActionClick = () => {
        if (order.status === "Pendente") {
            onOpenUpdate()
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
                    onClick={handleActionClick}>
                    <Trigger
                        bullet
                        type="info"
                        icon={actionButton.icon}>
                        {actionButton.label}
                    </Trigger>
                </div>

                <div className={styles.order__button}>
                    <Trigger
                        bullet
                        type="error"
                        icon={deleteButton.icon}>
                        {deleteButton.label}
                    </Trigger>
                </div>
            </div>
        </article>
    )
}

export default Order