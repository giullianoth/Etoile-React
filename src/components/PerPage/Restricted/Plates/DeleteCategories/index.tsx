import styles from "../../../../Popup/Popup.module.css"
import type { ICategory } from '../../../../../types/plate'
import Popup from "../../../../Popup"
import Trigger from "../../../../Trigger"
import { useAppContext } from "../../../../../context/app-context"
import Loading from "../../../../Loading"
import { useEffect } from "react"

type Props = {
    willDeleteMany: boolean
    categoriesToDelete: ICategory[]
    onClosePopup: () => void
}

const DeleteCategories = ({ categoriesToDelete, onClosePopup, willDeleteMany }: Props) => {
    const { addMessage } = useAppContext().message

    const {
        deleting,
        deleteSuccess,
        deleteSuccessMessage,
        deleteErrorMessage,
        handleDeleteCategory,
        handleResetPlatesMessages,
    } = useAppContext().plates

    useEffect(() => {
        if (deleteSuccess && deleteSuccessMessage) {
            addMessage(deleteSuccessMessage)
            handleResetPlatesMessages()
            onClosePopup()
        }
    }, [addMessage, deleteSuccess, deleteSuccessMessage, handleResetPlatesMessages, onClosePopup])

    const handleConfirmDeletingCategories = async () => {
        const deletePromises = categoriesToDelete.map(category => handleDeleteCategory(category._id))
        await Promise.all(deletePromises)
    }

    return (
        <Popup>
            {categoriesToDelete.length
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>
                            {willDeleteMany ? "Excluir categorias selecionadas?" : "Excluir categoria?"}
                        </h2>

                        <p className={styles.popup__regularText}>Esta ação excluirá também os pratos vinculados a {willDeleteMany ? "estas categorias" : "esta categoria"}.</p>
                    </div>

                    <div
                        className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={onClosePopup}
                            disabled={deleting}>Não</button>

                        <button
                            className="button primary"
                            onClick={handleConfirmDeletingCategories}
                            disabled={deleting}>
                            Sim
                            {deleting && <Loading inButton />}
                        </button>
                    </div>

                    {deleteErrorMessage && <Trigger type="error">{deleteErrorMessage}</Trigger>}
                </>

                : <Trigger type="error">Falha ao carregar categorias. Tente de novo.</Trigger>}
        </Popup>
    )
}

export default DeleteCategories