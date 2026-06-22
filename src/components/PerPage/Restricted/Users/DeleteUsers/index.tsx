import { useEffect } from "react"
import { useAppContext } from "../../../../../context/app-context"
import type { IUser } from "../../../../../types/user"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import Trigger from "../../../../Trigger"
import Loading from "../../../../Loading"

type Props = {
    willDeleteMany: boolean
    usersToDelete: IUser[]
    onClosePopup: () => void
}

const DeleteUsers = ({ onClosePopup, usersToDelete, willDeleteMany }: Props) => {
    const { addMessage } = useAppContext().message
    const { user } = useAppContext().auth

    const {
        deleting,
        deleteSuccess,
        deleteSuccessMessage,
        deleteErrorMessage,
        handleDeleteUser,
        handleResetUsersMessage,
    } = useAppContext().users

    useEffect(() => {
        if (deleteSuccess && deleteSuccessMessage) {
            addMessage(deleteSuccessMessage)
            handleResetUsersMessage()
            onClosePopup()
        }
    }, [addMessage, deleteSuccess, deleteSuccessMessage, handleResetUsersMessage, onClosePopup])

    const handleConfirmDeletingUsers = async () => {
        if (!user) {
            return
        }

        const deletePromises = usersToDelete.map(userToDelete => handleDeleteUser(
            userToDelete._id,
            userToDelete._id === user._id
        ))

        await Promise.all(deletePromises)
    }

    return (
        <Popup>
            {usersToDelete.length
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>
                            {willDeleteMany ? "Excluir usuários selecionados?" : "Excluir usuário?"}
                        </h2>
                    </div>

                    <div
                        className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={onClosePopup}
                            disabled={deleting}>Não</button>

                        <button
                            className="button primary"
                            onClick={handleConfirmDeletingUsers}
                            disabled={deleting}>
                            Sim
                            {deleting && <Loading inButton />}
                        </button>
                    </div>

                    {deleteErrorMessage && <Trigger type="error">{deleteErrorMessage}</Trigger>}
                </>

                : <Trigger type="error">Falha ao carregar pratos. Tente de novo.</Trigger>}
        </Popup>
    )
}

export default DeleteUsers