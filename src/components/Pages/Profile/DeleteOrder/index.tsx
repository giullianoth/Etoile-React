import { useEffect, type Dispatch, type SetStateAction } from "react"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import { useAppContext } from "../../../../context/context"
import Loading from "../../../Loading"

type Props = {
    setDeleteOrderIsOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteOrder = ({ setDeleteOrderIsOpen }: Props) => {
    const {
        currentOrder,
        loading,
        success,
        successMessage,
        errorMessage,
        handleDeleteOrder
    } = useAppContext().orders

    const { addMessage } = useAppContext().message

    useEffect(() => {
        if (errorMessage) {
            addMessage(errorMessage, "error")
        }

        if (success && successMessage) {
            addMessage(successMessage)
        }
    }, [success, successMessage, errorMessage, handleDeleteOrder, addMessage])

    const handleConfirmDelete = async () => {
        if (!currentOrder?._id) {
            return
        }

        await handleDeleteOrder(currentOrder?._id)
        setDeleteOrderIsOpen(false)
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Excluir pedido?</h2>
            </div>

            <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                <button
                    className="button primary outline"
                    onClick={() => setDeleteOrderIsOpen(false)}
                    disabled={loading}>Não</button>

                <button
                    className="button primary"
                    onClick={handleConfirmDelete}
                    disabled={loading}>
                    Sim
                    {loading && <Loading inButton />}
                </button>
            </div>
        </Popup>
    )
}

export default DeleteOrder