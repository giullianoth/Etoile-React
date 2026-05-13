import { PiCheckCircle, PiTrash } from "react-icons/pi"
import styles from "./Row.module.css"
import Checkbox from "../../../../Form/Checkbox"
import { useCurrency } from "../../../../../hooks/currency"
import type { MouseEventHandler } from "react"

type Props = {
    selecting: boolean
    onOpenEdit: () => void
    onOpenDelete: MouseEventHandler
}

const PlateRow = ({ onOpenDelete, onOpenEdit, selecting }: Props) => {
    const currency = useCurrency()

    return (
        <tr
            role="button"
            className={styles.plateRow}
            onClick={() => onOpenEdit()}>
            <td>
                <Checkbox
                    className={styles.plateRow__checkbox}
                    title="Selecionar este prato"
                    onClick={event => event.stopPropagation()} />
            </td>
            <td className={styles.plateRow__image}>
                <img
                    src={"/images/no-image.jpg"}
                    alt={"Nome do prato"} />
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Prato:</strong>&nbsp;
                </span>
                <strong>Nome do prato</strong>
            </td>

            <td className="centered">
                <span className="label-on-cell">
                    <strong>Disponível:</strong>&nbsp;
                </span>
                <PiCheckCircle className={styles.plateRow__available} />
                {/* <PiEmpty className={styles.plateRow__notAvailable} /> */}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Categoria:</strong>&nbsp;
                </span>
                Categoria
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Descrição:</strong>&nbsp;
                </span>
                Descrição - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, animi ipsum quas cupiditate officia nostrum.
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Preço:</strong>&nbsp;
                </span>
                {currency(0)}
            </td>

            <td className="centered">
                {selecting &&
                    <p className={styles.plateRow__actions}>
                        <button
                            className="button clear"
                            title="Excluit prato"
                            onClick={onOpenDelete}>
                            <PiTrash />
                        </button>
                    </p>}
            </td>
        </tr>
    )
}

export default PlateRow