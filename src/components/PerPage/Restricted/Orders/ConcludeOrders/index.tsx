import styles from "../../../../Popup/Popup.module.css"
import type { IOrder } from '../../../../../types/order'
import Popup from "../../../../Popup"
import { useAppContext } from "../../../../../context/app-context"
import Trigger from "../../../../Trigger"
import Loading from "../../../../Loading"
import { useEffect } from "react"

type Props = {
    ordersToConclude: IOrder[]
    onClosePopup: () => void
}

const ConcludeOrder = ({ onClosePopup, ordersToConclude }: Props) => {
    const { addMessage } = useAppContext().message

    const {
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleConcludeOrder,
        handleResetOrdersMessage,
    } = useAppContext().orders

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            handleResetOrdersMessage()
            onClosePopup()
        }
    }, [addMessage, mutateSuccess, mutateSuccessMessage, onClosePopup, handleResetOrdersMessage])

    const handleConfirmConcludingOrders = async () => {
        const concludePromises = ordersToConclude.map(order => handleConcludeOrder(order._id))
        await Promise.all(concludePromises)
    }

    return (
        <Popup>
            {ordersToConclude.length
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>Marcar pedidos como Concluído?</h2>
                    </div>

                    <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={onClosePopup}
                            disabled={mutating}>Não</button>

                        <button
                            className="button primary"
                            onClick={handleConfirmConcludingOrders}
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

export default ConcludeOrder