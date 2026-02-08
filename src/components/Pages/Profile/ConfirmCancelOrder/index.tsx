import { useEffect, type Dispatch, type SetStateAction } from "react"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import { useAppContext } from "../../../../context/context"
import Loading from "../../../Loading"

type Props = {
    setCancelIsOpen: Dispatch<SetStateAction<boolean>>
}

const ConfirmCancelOrder = ({ setCancelIsOpen }: Props) => {
    const {
        currentOrder,
        handleCancelOrder,
        success,
        errorMessage,
        successMessage,
        loading
    } = useAppContext().orders

    const { addMessage } = useAppContext().message

    useEffect(() => {
        if (errorMessage) {
            addMessage(errorMessage, "error")
        }

        if (success && successMessage) {
            addMessage(successMessage)
        }
    }, [success, successMessage, errorMessage, handleCancelOrder, addMessage])

    const handleCancelCurrentOrder = async () => {
        if (!currentOrder?._id) {
            return
        }

        console.log(currentOrder)
        await handleCancelOrder(currentOrder?._id)
        setCancelIsOpen(false)
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Cancelar pedido?</h2>
            </div>

            <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                <button
                    className="button primary outline"
                    onClick={() => setCancelIsOpen(false)}
                    disabled={loading}>Não</button>

                <button
                    className="button primary"
                    onClick={handleCancelCurrentOrder}
                    disabled={loading}>
                    Sim
                    {loading && <Loading inButton />}
                </button>
            </div>
        </Popup>
    )
}

export default ConfirmCancelOrder