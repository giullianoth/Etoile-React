import styles from "./OrderRow.module.css"
import Checkbox from "../../../../Form/Checkbox"
import type { ChangeEvent, MouseEvent } from "react"
import { PiTrash } from "react-icons/pi"
import { useDateFormats } from "../../../../../hooks/date-formats"
import type { IOrder } from "../../../../../types/order"
import { useAppContext } from "../../../../../context/app-context"

type Props = {
    onOpenEdit: () => void
    onOpenDelete: () => void
    onSelect: (orderId: string, selected: boolean) => void
    order: IOrder
    selected: boolean
    selecting: boolean
}

const OrderRow = ({ onOpenEdit, onOpenDelete, onSelect, order, selected, selecting }: Props) => {
    const { dateFormat, timeFormat } = useDateFormats()
    const { handleSetOrderToEdit } = useAppContext().orders

    const statusClassName = {
        Pendente: "order__pending",
        Cancelado: "order__cancelled",
        Concluído: "order__completed",
    }

    const handleOpenDelete = (event: MouseEvent) => {
        event.stopPropagation()

        if (!selecting) {
            onOpenDelete()
        }
    }

    const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        onSelect(order._id, event.target.checked)
    }

    const handleSelectOrderToEdit = () => {
        if (!selecting) {
            handleSetOrderToEdit(order)
            onOpenEdit()
        }
    }

    return (
        <tr
            role="button"
            onClick={handleSelectOrderToEdit}
            className={`${styles.orderRow} ${styles[statusClassName[order.status]]}`}>
            <td>
                <Checkbox
                    title="Selecionar este pedido"
                    className={styles.orderRow__checkbox}
                    onClick={event => event.stopPropagation()}
                    checked={selected}
                    onChange={handleSelect} />
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
                {timeFormat(order.time)}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Cliente:</strong>&nbsp;
                </span>
                "{order.userDetails[0].fullname}"
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Itens:</strong>&nbsp;
                </span>
                {order.orderItems.map(item => item.itemDetails.name).join(", ")}
            </td>

            <td className="centered">
                <p>
                    <button
                        className="button clear"
                        title="Excluit pedido"
                        onClick={handleOpenDelete}
                        disabled={selecting}>
                        <PiTrash />
                    </button>
                </p>
            </td>
        </tr>
    )
}

export default OrderRow