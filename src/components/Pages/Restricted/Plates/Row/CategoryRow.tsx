import { PiTrash } from "react-icons/pi"
import Checkbox from "../../../../Form/Checkbox"
import styles from "./Row.module.css"
import type { MouseEventHandler } from "react"

type Props = {
  selecting: boolean
  onOpenEdit: () => void
  onOpenDelete: MouseEventHandler
}

const CategoryRow = ({ onOpenDelete, onOpenEdit, selecting }: Props) => {
  return (
    <tr
      role="button"
      className={styles.plateRow}
      onClick={() => onOpenEdit()}>
      <td>
        <Checkbox
          className={styles.plateRow__checkbox}
          title="Selecionar categoria"
          onClick={event => event.stopPropagation()} />
      </td>

      <td>
        <span className="label-on-cell">
          <strong>Categoria:</strong>&nbsp;
        </span>

        <strong>Categoria</strong>
      </td>

      <td>
        <span className="label-on-cell">
          <strong>Descrição:</strong>&nbsp;
        </span>
        Descrição: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, repellendus ea numquam deleniti aliquam adipisci excepturi.
      </td>

      <td className="centered">
        {selecting &&
        <p className={styles.plateRow__actions}>

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