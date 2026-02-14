import styles from "./OrderRow.module.css"
import type { IOrder } from '../../../../../types/order'
import Checkbox from "../../../../Form/Checkbox"
import { useDateFormats } from "../../../../../hooks/date-formats"
import type { MouseEventHandler } from "react"
import { PiTrash } from "react-icons/pi"

type Props = {
    order: IOrder
    checked: boolean
    onOpenEdit: (orderToEdit: IOrder) => void
    onOpenDelete: MouseEventHandler
    onSelectOrder: (orderId: string, selected: boolean) => void
}

const OrderRow = ({ order, checked, onOpenEdit, onOpenDelete, onSelectOrder }: Props) => {
    const { dateFormat, dateTimeFormat } = useDateFormats()

    const statusClassName = {
        Pendente: "order__pending",
        Cancelado: "order__cancelled",
        Concluído: "order__completed",
    }

    return (
        <tr
            onClick={() => onOpenEdit(order)}
            className={`${styles.orderRow} ${styles[statusClassName[order.status]]}`
                + (checked ? ` ${styles.selected}` : "")}>
            <td>
                <Checkbox
                    title="Selecionar pedido"
                    className={styles.orderRow__checkbox}
                    onClick={event => event.stopPropagation()}
                    checked={checked}
                    onChange={event => onSelectOrder(order._id, event.target.checked)} />
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Status:</strong>&nbsp;
                </span>
                {order.status}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Data de comparecimento:</strong>&nbsp;
                </span>
                {dateFormat(order.time)}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Horário de comparecimento:</strong>&nbsp;
                </span>
                {dateTimeFormat(order.time)}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Cliente:</strong>&nbsp;
                </span>
                {order.userDetails[0].fullname}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Itens:</strong>&nbsp;
                </span>
                {order.orderItems
                    .map(item => item.itemDetails.name)
                    .join(", ")}
            </td>

            <td className="centered">
                <p>
                    <button
                        className="button clear"
                        title="Excluit pedido"
                        onClick={onOpenDelete}>
                        <PiTrash />
                    </button>
                </p>
            </td>
        </tr>
    )
}

export default OrderRow