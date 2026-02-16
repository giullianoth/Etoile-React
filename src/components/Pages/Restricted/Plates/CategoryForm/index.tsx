import { useEffect, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import { useAppContext } from "../../../../../context/context"
import Loading from "../../../../Loading"
import type { ICategory } from "../../../../../types/plate"
import Trigger from "../../../../Trigger"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import TextareaWithLabel from "../../../../Form/InputWithLabel/TextareaWithLabel"

type Props = {
    setCategoryFormIsOpen: Dispatch<SetStateAction<boolean>>
}

const CategoryForm = ({ setCategoryFormIsOpen }: Props) => {
    const {
        currentCategory,
        loading,
        categoryFormFields,
        handleChangeCategoryFormFields,
        errorMessage,
        handleUpdateCategory,
        success,
        successMessage,
        handleClearCategoryFormFields,
        handleCreateCategory
    } = useAppContext().plates

    const { addMessage } = useAppContext().message

    useEffect(() => {
        if (!currentCategory) {
            handleClearCategoryFormFields()
        }
    }, [currentCategory, handleClearCategoryFormFields])

    useEffect(() => {
        if (success && successMessage) {
            addMessage(successMessage)
            setCategoryFormIsOpen(false)
        }
    }, [addMessage, setCategoryFormIsOpen, success, successMessage])

    const handleChangeData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleChangeCategoryFormFields(
            event.target.name as keyof ICategory,
            event.target.value
        )
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (currentCategory && currentCategory._id) {
            await handleUpdateCategory(currentCategory._id)
        } else {
            await handleCreateCategory()
        }
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>
                    {currentCategory ? "Editar categoria" : "Nova categoria"}
                </h2>
            </div>

            <form className={styles.popup__form} onSubmit={handleSubmit}>
                <InputWithLabel
                    type="text"
                    name="name"
                    label="Categoria"
                    placeholder="Categoria"
                    required
                    value={categoryFormFields.name}
                    onChange={handleChangeData} />

                <TextareaWithLabel
                    rows={5}
                    name="description"
                    label="Descrição"
                    placeholder="Descrição"
                    required
                    value={categoryFormFields.description}
                    onChange={handleChangeData}></TextareaWithLabel>

                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                    <span
                        className="button primary outline"
                        onClick={() => setCategoryFormIsOpen(false)}>
                        Cancelar
                    </span>

                    <button
                        type="submit"
                        className="button primary"
                        disabled={loading}>
                        {currentCategory ? "Atualizar" : "Criar"}
                        {loading && <Loading inButton />}
                    </button>
                </div>
            </form>

            {errorMessage && <Trigger type="error">{errorMessage}</Trigger>}
        </Popup>
    )
}

export default CategoryForm