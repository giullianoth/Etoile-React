import { useEffect } from "react"
import { useAppContext } from "../../../../context/app-context"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import Trigger from "../../../Trigger"

type Props = {
    onClosePopup: () => void
}

const DeleteOrder = ({ onClosePopup }: Props) => {
    const { addMessage } = useAppContext().message

    const {
        currentOrder,
        deleting,
        deleteSuccess,
        deleteSuccessMessage,
        deleteErrorMessage,
        handleDeleteOrder,
        handleResetOrdersMessage,
    } = useAppContext().orders

    useEffect(() => {
        if (deleteSuccess && deleteSuccessMessage) {
            addMessage(deleteSuccessMessage)
            handleResetOrdersMessage()
            onClosePopup()
        }
    }, [addMessage, deleteSuccess, deleteSuccessMessage, handleResetOrdersMessage, onClosePopup])

    const handleConfirmDelete = async () => {
        if (!currentOrder) {
            return
        }

        await handleDeleteOrder(currentOrder._id)
    }

    return (
        <Popup>
            {currentOrder
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>Excluir pedido?</h2>
                    </div>

                    <div
                        className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={onClosePopup}
                            disabled={deleting}>Não</button>

                        <button
                            className="button primary"
                            onClick={handleConfirmDelete}
                            disabled={deleting}>
                            Sim
                        </button>
                    </div>

                    {deleteErrorMessage && <Trigger type="error">{deleteErrorMessage}</Trigger>}
                </>

                : <Trigger type="error">Erro ao carregar pedido. Tente de novo.</Trigger>}
        </Popup>
    )
}

export default DeleteOrder