import { useEffect } from "react"
import { useAppContext } from "../../../../context/app-context"
import Loading from "../../../Loading"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import Trigger from "../../../Trigger"

type Props = {
    onClosePopup: () => void
}

const ConfirmCancelOrder = ({ onClosePopup }: Props) => {
    const { addMessage } = useAppContext().message

    const {
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleCancelOrder,
        handleResetOrdersMessage,
        currentOrder,
    } = useAppContext().orders

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            handleResetOrdersMessage()
            onClosePopup()
        }
    }, [addMessage, handleResetOrdersMessage, mutateSuccess, mutateSuccessMessage, onClosePopup])

    const handleCancelCurrentOrder = async () => {
        if (!currentOrder) {
            return
        }

        await handleCancelOrder(currentOrder._id)
    }

    return (
        <Popup>
            {currentOrder
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>Cancelar pedido?</h2>
                    </div>

                    <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={onClosePopup}
                            disabled={mutating}>Não</button>

                        <button
                            className="button primary"
                            onClick={handleCancelCurrentOrder}
                            disabled={mutating}>
                            Sim
                            {mutating && <Loading inButton />}
                        </button>
                    </div>

                    {mutateErrorMessage && <Trigger type="error">{mutateErrorMessage}</Trigger>}
                </>

                : <Trigger type="error">Erro inesperado ao carregar pedido.</Trigger>}
        </Popup>
    )
}

export default ConfirmCancelOrder