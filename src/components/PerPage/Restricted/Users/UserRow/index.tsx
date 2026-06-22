import { PiTrash } from "react-icons/pi"
import Checkbox from "../../../../Form/Checkbox"
import styles from "./UserRow.module.css"
import type { IUser } from "../../../../../types/user"
import { uploadsURL } from "../../../../../services/api"
import type { ChangeEvent, MouseEvent } from "react"
import { useAppContext } from "../../../../../context/app-context"

type Props = {
    user: IUser
    selected: boolean
    selecting: boolean
    onSelect: (userId: string, selected: boolean) => void
    onOpenEdit: () => void
    onOpenDelete: () => void
}

const UserRow = ({ user, onSelect, selected, selecting, onOpenEdit, onOpenDelete }: Props) => {
    const { handleSetUserToEdit } = useAppContext().users

    const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        onSelect(user._id, event.target.checked)
    }

    const handleSelectUserToEdit = () => {
        if (!selecting) {
            handleSetUserToEdit(user)
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
            className={styles.row}
            onClick={handleSelectUserToEdit}>
            <td>
                <Checkbox
                    className={styles.row__checkbox}
                    checked={selected}
                    onChange={handleSelect}
                    onClick={event => event.stopPropagation()} />
            </td>

            <td className={`centered ${styles.row__image}`}>
                <img
                    src={
                        user.photo
                            ? `${uploadsURL}/users/${user.photo}`
                            : "/images/user.png"
                    }
                    alt={user.fullname} />
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Cliente:</strong>&nbsp;
                </span>
                {user.fullname}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Papel:</strong>&nbsp;
                </span>
                {user.role}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>E-mail:</strong>&nbsp;
                </span>
                {user.email}
            </td>

            <td>
                <span className="label-on-cell">
                    <strong>Telefone:</strong>&nbsp;
                </span>
                {user.phone || "--"}
            </td>

            <td className="centered">
                <p className={styles.row__actions}>
                    <button
                        className="button clear"
                        title="Excluit usuário"
                        onClick={handleOpenDelete}
                        disabled={selecting}>
                        <PiTrash />
                    </button>
                </p>
            </td>
        </tr>
    )
}

export default UserRow