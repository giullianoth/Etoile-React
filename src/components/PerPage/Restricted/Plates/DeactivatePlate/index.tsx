import { useEffect } from "react"
import { useAppContext } from "../../../../../context/app-context"
import type { IPlate } from "../../../../../types/plate"
import Loading from "../../../../Loading"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import Trigger from "../../../../Trigger"

type Props = {
    platesToDeactivate: IPlate[]
    onClosePopup: () => void
}

const DeactivatePlate = ({ onClosePopup, platesToDeactivate }: Props) => {
    const { addMessage } = useAppContext().message

    const {
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleDisablePlate,
        handleResetPlatesMessages,
    } = useAppContext().plates

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            handleResetPlatesMessages()
            onClosePopup()
        }
    }, [addMessage, mutateSuccess, mutateSuccessMessage, handleResetPlatesMessages, onClosePopup])

    const handleConfirmDeactivatingPlates = async () => {
        const activatePromises = platesToDeactivate.map(plate => handleDisablePlate(plate._id))
        await Promise.all(activatePromises)
    }

    return (
        <Popup>
            {platesToDeactivate.length
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>Marcar pratos como Indisponível?</h2>
                    </div>

                    <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={onClosePopup}
                            disabled={mutating}>Não</button>

                        <button
                            className="button primary"
                            onClick={handleConfirmDeactivatingPlates}
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

export default DeactivatePlate