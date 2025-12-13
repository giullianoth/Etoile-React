import { useEffect, useState, type ReactNode } from "react"
import type { IOrder } from "../../../../types/order"
import styles from "./Order.module.css"
import type { IMessageType } from "../../../../types/message"
import { PiArrowsClockwise, PiCheckCircle, PiClock, PiNotePencil, PiTrash, PiWarningCircle, PiX } from "react-icons/pi"
import Trigger from "../../../Trigger"
import { useDateFormats } from "../../../../hooks/date-formats"

type Props = {
    order: IOrder
}

const Order = ({ order }: Props) => {
    const [statusIcon, setStatusIcon] = useState<ReactNode | null>(null)
    const [statusType, setStatusType] = useState<IMessageType | null>(null)
    const { dateFormat, dateTimeFormat } = useDateFormats()

    useEffect(() => {
        switch (order.status) {
            case "Pendente":
                setStatusIcon(<PiClock />)
                setStatusType("warning")
                break

            case "Cancelado":
                setStatusIcon(<PiWarningCircle />)
                setStatusType("error")
                break

            case "Concluído":
                setStatusIcon(<PiCheckCircle />)
                setStatusType("success")
                break
        }
    }, [order])

    return (
        <article className={styles.order}>
            <div className={styles.order__status}>
                <Trigger type={statusType!} icon={statusIcon} bullet>
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
                <div className={styles.order__button}>
                    <Trigger
                        bullet
                        type="info"
                        icon={order.status === "Pendente" ? <PiNotePencil /> : <PiArrowsClockwise />}>
                        {order.status === "Pendente" ? "Editar" : "Pedir de novo"}
                    </Trigger>
                </div>

                <div className={styles.order__button}>
                    <Trigger
                        bullet
                        type="error"
                        icon={order.status === "Pendente" ? <PiX /> : <PiTrash />}>
                        {order.status === "Pendente" ? "Cancelar pedido" : "Excluir"}
                    </Trigger>
                </div>
            </div>
        </article>
    )
}

export default Order