import { PiCheckCircle, PiEmpty, PiTrash } from "react-icons/pi"
import Checkbox from "../../../../Form/Checkbox"
import styles from "../Row.module.css"
import { useCurrency } from "../../../../../hooks/currency"
import type { IPlate } from "../../../../../types/plate"
import { uploadsURL } from "../../../../../services/api"
import type { ChangeEvent, MouseEvent } from "react"
import { useAppContext } from "../../../../../context/app-context"

type Props = {
    plate: IPlate
    selected: boolean
    selecting: boolean
    onSelect: (plateId: string, selected: boolean) => void
    onOpenEdit: () => void
    onOpenDelete: () => void
}

const PlateRow = ({ plate, selected, selecting, onSelect, onOpenEdit, onOpenDelete }: Props) => {
    const currency = useCurrency()
    const { handleSetPlateToEdit } = useAppContext().plates

    const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        onSelect(plate._id, event.target.checked)
    }

    const handleSelectPlateToEdit = () => {
        if (!selecting) {
            handleSetPlateToEdit(plate)
            onOpenEdit()
        }
    }

    const handleOpenDelete = (event: MouseEvent) => {
        event.stopPropagation()

        if (!selecting) {
            onOpenDelete()
        }
    }

    return (
        <tr
            role="button"
            className={styles.plateRow}
            onClick={handleSelectPlateToEdit}>
            <td>
                <Checkbox
                    className={styles.plateRow__checkbox}
                    title="Selecionar este prato"
                    checked={selected}
                    onChange={handleSelect}
                    onClick={event => event.stopPropagation()} />
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
                <p className={styles.plateRow__actions}>
                    <button
                        className="button clear"
                        title="Excluir prato"
                        onClick={handleOpenDelete}
                        disabled={selecting}>
                        <PiTrash />
                    </button>
                </p>
            </td>
        </tr>
    )
}

export default PlateRow