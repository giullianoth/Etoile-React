import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import { useAppContext } from "../../../../../context/context"
import Loading from "../../../../Loading"
import type { ICategory } from "../../../../../types/plate"
import Trigger from "../../../../Trigger"

type Props = {
    setCategoryFormIsOpen: Dispatch<SetStateAction<boolean>>
}

const CategoryForm = ({ setCategoryFormIsOpen }: Props) => {
    const {
        currentCategory,
        loading,
        categoryFormFields,
        handleChangeCategoryFormFields,
        errorMessage
    } = useAppContext().plates

    const handleChangeData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleChangeCategoryFormFields(
            event.target.name as keyof ICategory,
            event.target.value
        )
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        console.log(categoryFormFields)
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>
                    {currentCategory ? "Editar categoria" : "Nova categoria"}
                </h2>
            </div>

            <form className={styles.popup__form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Categoria *"
                    value={categoryFormFields.name}
                    onChange={handleChangeData} />

                <textarea
                    rows={5}
                    name="description"
                    placeholder="Descrição *"
                    value={categoryFormFields.description}
                    onChange={handleChangeData}></textarea>

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