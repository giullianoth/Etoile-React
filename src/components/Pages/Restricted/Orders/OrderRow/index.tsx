import styles from "./OrderRow.module.css"
import Checkbox from "../../../../Form/Checkbox"
import type { MouseEventHandler } from "react"
import { PiTrash } from "react-icons/pi"

type Props = {
    onOpenEdit: () => void
    onOpenDelete: MouseEventHandler
}

const OrderRow = ({ onOpenEdit, onOpenDelete }: Props) => {

    const statusClassName = {
        Pendente: "order__pending",
        Cancelado: "order__cancelled",
        Concluído: "order__completed",
    }

    return (
        <tr
            onClick={() => onOpenEdit()}
            className={`${styles.orderRow} ${styles[statusClassName["Pendente"]]}`}>
            <td>
                <Checkbox
                    title="Selecionar pedido"
                    className={styles.orderRow__checkbox}
                    onClick={event => event.stopPropagation()} />
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Status:</strong>&nbsp;
                </span>
                Status
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Data de comparecimento:</strong>&nbsp;
                </span>
                {new Date().toLocaleDateString()}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Horário de comparecimento:</strong>&nbsp;
                </span>
                {new Date().toLocaleTimeString()}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Cliente:</strong>&nbsp;
                </span>
                "Cliente"
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Itens:</strong>&nbsp;
                </span>
                Itens
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