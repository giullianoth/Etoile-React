import { useEffect, type Dispatch, type SetStateAction } from 'react'
import Popup from '../../../../Popup'
import styles from "../../../../Popup/Popup.module.css"
import { useAppContext } from '../../../../../context/context'
import Loading from '../../../../Loading'

type Props = {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
    title: string
}

const Delete = ({ setModalIsOpen, title }: Props) => {
    const {
        currentCategory,
        success,
        successMessage,
        errorMessage,
        loading,
        handleDeleteCategory
    } = useAppContext().plates

    const { addMessage } = useAppContext().message

    useEffect(() => {
        if (errorMessage) {
            addMessage(errorMessage, "error")
            setModalIsOpen(false)
        }

        if (success && successMessage) {
            addMessage(successMessage)
            setModalIsOpen(false)
        }
    }, [addMessage, errorMessage, setModalIsOpen, success, successMessage])

    const handleDelete = async () => {
        if (currentCategory && currentCategory._id) {
            await handleDeleteCategory(currentCategory._id)
        }
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>{title}</h2>
            </div>

            <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                <button
                    className="button primary outline"
                    disabled={loading}
                    onClick={() => setModalIsOpen(false)}>Não</button>

                <button
                    className="button primary"
                    disabled={loading}
                    onClick={handleDelete}>
                    Sim
                    {loading && <Loading inButton />}
                </button>
            </div>
        </Popup>
    )
}

export default Delete