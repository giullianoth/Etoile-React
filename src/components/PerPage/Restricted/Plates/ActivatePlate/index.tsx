import { useEffect } from "react"
import { useAppContext } from "../../../../../context/app-context"
import type { IPlate } from "../../../../../types/plate"
import Loading from "../../../../Loading"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import Trigger from "../../../../Trigger"

type Props = {
    platesToActivate: IPlate[]
    onClosePopup: () => void
}

const ActivatePlate = ({ onClosePopup, platesToActivate }: Props) => {
    const { addMessage } = useAppContext().message

    const {
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleEnablePlate,
        handleResetPlatesMessages,
    } = useAppContext().plates

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            handleResetPlatesMessages()
            onClosePopup()
        }
    }, [addMessage, mutateSuccess, mutateSuccessMessage, handleResetPlatesMessages, onClosePopup])

    const handleConfirmActivatingPlates = async () => {
        const activatePromises = platesToActivate.map(plate => handleEnablePlate(plate._id))
        await Promise.all(activatePromises)
    }

    return (
        <Popup>
            {platesToActivate.length
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>Marcar pratos como Disponível?</h2>
                    </div>

                    <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={onClosePopup}
                            disabled={mutating}>Não</button>

                        <button
                            className="button primary"
                            onClick={handleConfirmActivatingPlates}
                            disabled={mutating}>
                            Sim
                            {mutating && <Loading inButton />}
                        </button>
                    </div>

                    {mutateErrorMessage && <Trigger type="error">{mutateErrorMessage}</Trigger>}
                </>

                : <Trigger type="error">Erro ao carregar pratos. Tente de novo.</Trigger>}
        </Popup>
    )
}

export default ActivatePlate