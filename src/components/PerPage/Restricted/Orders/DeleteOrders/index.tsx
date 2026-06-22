import { useEffect } from "react"
import { useAppContext } from "../../../../../context/app-context"
import type { IOrder } from "../../../../../types/order"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import Trigger from "../../../../Trigger"
import Loading from "../../../../Loading"

type Props = {
    ordersToDelete: IOrder[]
    willDeleteMany: boolean
    onClosePopup: () => void
}

const DeleteOrders = ({ onClosePopup, ordersToDelete, willDeleteMany }: Props) => {
    const { addMessage } = useAppContext().message

    const {
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
    }, [addMessage, deleteSuccess, deleteSuccessMessage, onClosePopup, handleResetOrdersMessage])

    const handleConfirmDeleteOrders = async () => {
        const deletePromises = ordersToDelete.map(order => handleDeleteOrder(order._id))
        await Promise.all(deletePromises)
    }

    return (
        <Popup>
            {ordersToDelete.length
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>{willDeleteMany ? "Excluir pedidos selecionados?" : "Excluir pedido?"}</h2>
                    </div>

                    <div
                        className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={onClosePopup}
                            disabled={deleting}>Não</button>

                        <button
                            className="button primary"
                            onClick={handleConfirmDeleteOrders}
                            disabled={deleting}>
                            Sim
                            {deleting && <Loading inButton />}
                        </button>
                    </div>

                    {deleteErrorMessage && <Trigger type="error">{deleteErrorMessage}</Trigger>}
                </>

                : <Trigger type="error">Falha ao carregar pedidos. Tente de novo.</Trigger>}
        </Popup>
    )
}

export default DeleteOrders