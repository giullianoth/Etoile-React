import { PiCheckCircle, PiEmpty, PiNotePencil, PiTrash } from "react-icons/pi"
import type { IPlate } from "../../../../../types/plate"
import styles from "./Row.module.css"
import Checkbox from "../../../../Form/Checkbox"
import { useCurrency } from "../../../../../hooks/currency"
import { uploadsURL } from "../../../../../services/api"

type Props = {
    plate: IPlate
    checked: boolean
    selecting: boolean
    onOpenEdit: (plateToEdit: IPlate) => void
    onOpenDelete: (plateToDelete: IPlate) => void
    onSelectPlate: (plateId: string, selected: boolean) => void
}

const PlateRow = ({ checked, onOpenDelete, onOpenEdit, onSelectPlate, plate, selecting }: Props) => {
    const currency = useCurrency()

    return (
        <tr>
            <td>
                <Checkbox
                    className={styles.plateRow__checkbox}
                    title="Selecionar prato"
                    checked={checked}
                    onChange={event => onSelectPlate(plate._id, event.target.checked)} />
            </td>
            <td className={styles.plateRow__image}>
                <img
                    src={
                        plate.image
                            ? `${uploadsURL}/plates/${plate.image}`
                            : "/images/no-image.jpg"
                    }
                    alt={plate.name} />
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Prato:</strong>&nbsp;
                </span>
                <strong>{plate.name}</strong>
            </td>

            <td className="centered">
                <span className="label-on-cell">
                    <strong>Disponível:</strong>&nbsp;
                </span>
                {plate.available
                    ? <PiCheckCircle className={styles.plateRow__available} />
                    : <PiEmpty className={styles.plateRow__notAvailable} />}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Categoria:</strong>&nbsp;
                </span>
                {plate.category}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Descrição:</strong>&nbsp;
                </span>
                {plate.description}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Preço:</strong>&nbsp;
                </span>
                {currency(plate.price)}
            </td>

            <td className="centered">
                {selecting &&
                    <p className={styles.plateRow__actions}>
                        <button
                            className="button clear"
                            title="Editar prato"
                            onClick={() => onOpenEdit(plate)}>
                            <PiNotePencil />
                        </button>

                        <button
                            className="button clear"
                            title="Excluit prato"
                            onClick={() => onOpenDelete(plate)}>
                            <PiTrash />
                        </button>
                    </p>}
            </td>
        </tr>
    )
}

export default PlateRow