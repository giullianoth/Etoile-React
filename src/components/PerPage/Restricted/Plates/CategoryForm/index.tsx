import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import type { ICategory } from "../../../../../types/plate"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import TextareaWithLabel from "../../../../Form/InputWithLabel/TextareaWithLabel"
import { useAppContext } from "../../../../../context/app-context"
import Loading from "../../../../Loading"
import Trigger from "../../../../Trigger"

type Props = {
    action: "create" | "update"
    onClosePopup: () => void
}

const CategoryForm = ({ action, onClosePopup }: Props) => {
    const [formData, setFormData] = useState<Partial<ICategory>>({})
    const { addMessage } = useAppContext().message

    const {
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleCreateCategory,
        handleUpdateCategory,
        handleResetPlatesMessages,
        currentCategory,
    } = useAppContext().plates

    useEffect(() => {
        const initializeFormData = () => {
            if (action === "update" && currentCategory) {
                setFormData({
                    name: currentCategory.name,
                    description: currentCategory.description
                })
            }
        }

        initializeFormData()
    }, [action, currentCategory])

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            handleResetPlatesMessages()
            onClosePopup()
        }
    }, [addMessage, handleResetPlatesMessages, mutateSuccess, mutateSuccessMessage, onClosePopup])

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmitAndCreate = async (event: FormEvent) => {
        event.preventDefault()

        switch (action) {
            case "create":
                await handleCreateCategory(formData)
                break

            case "update":
                if (currentCategory) {
                    await handleUpdateCategory(formData, currentCategory._id)
                }
                break
        }
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>
                    {action === "create" ? "Nova" : "Editar"} categoria
                </h2>
            </div>

            <form className={styles.popup__form} onSubmit={handleSubmitAndCreate}>
                <InputWithLabel
                    type="text"
                    name="name"
                    label="Categoria"
                    placeholder="Categoria"
                    required
                    value={formData.name || ""}
                    onChange={handleChangeFormData} />

                <TextareaWithLabel
                    rows={5}
                    name="description"
                    label="Descrição"
                    placeholder="Descrição"
                    required
                    value={formData.description || ""}
                    onChange={handleChangeFormData}></TextareaWithLabel>

                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                    <button
                        type="button"
                        className="button primary outline"
                        onClick={onClosePopup}
                        disabled={mutating}>
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="button primary"
                        disabled={mutating}>
                        {action === "create" ? "Criar" : "Atualizar"}
                        {mutating && <Loading inButton />}
                    </button>
                </div>
            </form>

            {mutateErrorMessage && <Trigger type="error">{mutateErrorMessage}</Trigger>}
        </Popup>
    )
}

export default CategoryForm