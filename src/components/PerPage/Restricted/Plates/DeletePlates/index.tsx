import styles from "../../../../Popup/Popup.module.css"
import type { IPlate } from '../../../../../types/plate'
import Popup from "../../../../Popup"
import Trigger from "../../../../Trigger"
import { useAppContext } from "../../../../../context/app-context"
import { useEffect } from "react"
import Loading from "../../../../Loading"

type Props = {
    willDeleteMany: boolean
    platesToDelete: IPlate[]
    onClosePopup: () => void
}

const DeletePlates = ({ onClosePopup, platesToDelete, willDeleteMany }: Props) => {
    const { addMessage } = useAppContext().message

    const {
        deleting,
        deleteSuccess,
        deleteSuccessMessage,
        deleteErrorMessage,
        handleDeletePlate,
        handleResetPlatesMessages,
    } = useAppContext().plates

    useEffect(() => {
        if (deleteSuccess && deleteSuccessMessage) {
            addMessage(deleteSuccessMessage)
            handleResetPlatesMessages()
            onClosePopup()
        }
    }, [addMessage, deleteSuccess, deleteSuccessMessage, handleResetPlatesMessages, onClosePopup])

    const handleConfirmDeletingPlates = async () => {
        const deletePromises = platesToDelete.map(plate => handleDeletePlate(plate._id))
        await Promise.all(deletePromises)
    }

    return (
        <Popup>
            {platesToDelete.length
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>
                            {willDeleteMany ? "Excluir pratos selecionados?" : "Excluir prato?"}
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
                            onClick={handleConfirmDeletingPlates}
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

export default DeletePlates