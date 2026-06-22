import { PiTrash } from "react-icons/pi"
import Checkbox from "../../../../Form/Checkbox"
import styles from "../Row.module.css"
import type { ICategory } from "../../../../../types/plate"
import type { ChangeEvent, MouseEvent } from "react"
import { useAppContext } from "../../../../../context/app-context"

type Props = {
    category: ICategory
    selected: boolean
    selecting: boolean
    onSelect: (categoryId: string, selected: boolean) => void
    onOpenEdit: () => void
    onOpenDelete: () => void
}

const CategoryRow = ({ category, selected, selecting, onSelect, onOpenEdit, onOpenDelete }: Props) => {
    const { handleSetCategoryToEdit } = useAppContext().plates

    const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        onSelect(category._id, event.target.checked)
    }

    const handleSelectCategoryToEdit = () => {
        if (!selecting) {
            handleSetCategoryToEdit(category)
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
            onClick={handleSelectCategoryToEdit}>
            <td>
                <Checkbox
                    className={styles.plateRow__checkbox}
                    title="Selecionar esta categoria"
                    checked={selected}
                    onChange={handleSelect}
                    onClick={event => event.stopPropagation()} />
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Categoria:</strong>&nbsp;
                </span>
                <strong>{category.name}</strong>
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Descrição:</strong>&nbsp;
                </span>
                {category.description}
            </td>

            <td className="centered">
                <p className={styles.plateRow__actions}>
                    <button
                        className="button clear"
                        title="Excluir categoria"
                        onClick={handleOpenDelete}
                        disabled={selecting}>
                        <PiTrash />
                    </button>
                </p>
            </td>
        </tr>
    )
}

export default CategoryRow