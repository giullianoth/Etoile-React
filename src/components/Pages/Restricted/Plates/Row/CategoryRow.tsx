import { PiNotePencil, PiTrash } from "react-icons/pi"
import Checkbox from "../../../../Form/Checkbox"
import styles from "./Row.module.css"
import type { ICategory } from "../../../../../types/plate"
import type { MouseEventHandler } from "react"

type Props = {
  category: ICategory
  checked: boolean
  selecting: boolean
  onOpenEdit: (categoryToEdit: ICategory) => void
  onOpenDelete: MouseEventHandler
  onSelectCategory: (categoryId: string, selected: boolean) => void
}

const CategoryRow = ({ category, checked, onOpenDelete, onOpenEdit, onSelectCategory, selecting }: Props) => {
  return (
    <tr>
      <td>
        <Checkbox
          className={styles.plateRow__checkbox}
          title="Selecionar categoria"
          checked={checked}
          onChange={event => onSelectCategory(category._id, event.target.checked)} />
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
        {selecting &&
          <p className={styles.plateRow__actions}>
            <button
              className="button clear"
              title="Editar categoria"
              onClick={() => onOpenEdit(category)}>
              <PiNotePencil />
            </button>

            <button
              className="button clear"
              title="Excluit categoria"
              onClick={onOpenDelete}>
              <PiTrash />
            </button>
          </p>}
      </td>
    </tr>
  )
}

export default CategoryRow