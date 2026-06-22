import styles from "../../../../Popup/Popup.module.css"
import type { IOrder } from '../../../../../types/order'
import Popup from "../../../../Popup"
import Trigger from "../../../../Trigger"
import { useAppContext } from "../../../../../context/app-context"
import { useEffect } from "react"
import Loading from "../../../../Loading"

type Props = {
    ordersToCancel: IOrder[]
    onClosePopup: () => void
}

const CancelOrders = ({ onClosePopup, ordersToCancel }: Props) => {
    const { addMessage } = useAppContext().message

    const {
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleCancelOrder,
        handleResetOrdersMessage,
    } = useAppContext().orders

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            handleResetOrdersMessage()
            onClosePopup()
        }
    }, [addMessage, mutateSuccess, mutateSuccessMessage, onClosePopup, handleResetOrdersMessage])

    const handleConfirmCancellingOrders = async () => {
        const cancelPromises = ordersToCancel.map(order => handleCancelOrder(order._id))
        await Promise.all(cancelPromises)
    }

    return (
        <Popup>
            {ordersToCancel.length
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>Marcar pedidos como Cancelado?</h2>
                    </div>

                    <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={onClosePopup}
                            disabled={mutating}>Não</button>

                        <button
                            className="button primary"
                            onClick={handleConfirmCancellingOrders}
                            disabled={mutating}>
                            Sim
                            {mutating && <Loading inButton />}
                        </button>
                    </div>

                    {mutateErrorMessage && <Trigger type="error">{mutateErrorMessage}</Trigger>}
                </>

                : <Trigger type="error">Erro ao carregar pedidos. Tente de novo.</Trigger>}
        </Popup>
    )
}

export default CancelOrders