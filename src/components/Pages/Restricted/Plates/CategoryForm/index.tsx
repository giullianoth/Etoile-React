import { useState, type ChangeEvent, type FormEvent } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import type { ICategory } from "../../../../../types/plate"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import TextareaWithLabel from "../../../../Form/InputWithLabel/TextareaWithLabel"

type Props = {
    onCloseCategoryForm: () => void
}

const CategoryForm = ({ onCloseCategoryForm }: Props) => {
    const [formData, setFormData] = useState<Partial<ICategory>>({})

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        onCloseCategoryForm()
        console.log(formData)
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>
                    Nova categoria
                </h2>
            </div>

            <form className={styles.popup__form} onSubmit={handleSubmit}>
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
                    <span
                        className="button primary outline"
                        onClick={onCloseCategoryForm}>
                        Cancelar
                    </span>

                    <button
                        type="submit"
                        className="button primary">
                        Criar
                    </button>
                </div>
            </form>
        </Popup>
    )
}

export default CategoryForm