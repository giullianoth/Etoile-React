import styles from "./Order.module.css"
import type { IMessageType } from "../../../../types/message"
import { PiArrowsClockwise, PiCheckCircle, PiClock, PiTrash, PiWarningCircle } from "react-icons/pi"
import Trigger from "../../../Trigger"
import { useEffect, useState } from "react"
import { useDateFormats } from "../../../../hooks/date-formats"

type Props = {
    onOpenUpdate: () => void
    onOpenCancel: () => void
    onOpenReorder: () => void
    onOpenDeleteOrder: () => void
}

type UpdateAction = "update" | "reorder"

type DeleteAction = "cancel" | "delete"

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

const Order = ({ onOpenUpdate, onOpenCancel, onOpenReorder, onOpenDeleteOrder }: Props) => {
    const currentStatus = statusConfig.Pendente
    const [cancelledMessage, setCancelledMessage] = useState<boolean>(false)
    const [cancelledConfirm] = useState<boolean>(false)
    const { timeFormat, dateFormat } = useDateFormats()

    const actionButton = {
        label: "Pedir de novo",
        icon: <PiArrowsClockwise />,
        action: "update" as UpdateAction
    }

    const deleteButton = {
        label: "Excluir",
        icon: <PiTrash />,
        action: "cancel" as DeleteAction
    }

    useEffect(() => {
        if (cancelledConfirm) {
            setCancelledMessage(true)
        }
    }, [cancelledConfirm])

    const handleActionClick = (action: UpdateAction) => {
        if (action === "update") {
            onOpenUpdate()
        }

        if (action === "reorder") {
            onOpenReorder()
        }
    }

    const handleDeleteClick = (action: DeleteAction) => {
        if (action === "cancel") {
            onOpenCancel()
        }

        if (action === "delete") {
            onOpenDeleteOrder()
        }
    }

    return (
        <article className={styles.order}>
            <div className={styles.order__status}>
                <Trigger type={currentStatus.type} icon={currentStatus.icon} bullet>
                    Status
                </Trigger>
            </div>

            <div className={styles.order__date}>
                <p>
                    <strong>{timeFormat(new Date())}</strong>
                </p>

                <p>
                    Presença confirmada às{" "}
                    <strong>{dateFormat(new Date())}</strong>
                </p>
            </div>

            <article className={styles.order__item}>
                <div className={styles.order__itemImage}>
                    <img
                        src={`/images/no-image.jpg`}
                        alt={"Nome do prato"} />
                </div>

                <div className={styles.order__itemInfo}>
                    <header className={styles.order__itemName}>
                        <h3>{"Nome do prato"}</h3>
                    </header>

                    <p className={styles.order__itemPortions}>
                        <strong>Porções: 2</strong>
                    </p>
                </div>
            </article>

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

            {cancelledMessage && <p>Pedido cancelado por exceder o prazo.</p>}
        </article>
    )
}

export default Order