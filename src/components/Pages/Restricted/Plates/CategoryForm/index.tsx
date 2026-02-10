import type { Dispatch, FormEvent, SetStateAction } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"

type Props = {
    setCategoryFormIsOpen: Dispatch<SetStateAction<boolean>>
    title: string
}

const CategoryForm = ({ setCategoryFormIsOpen, title }: Props) => {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>{title}</h2>
            </div>

            <form className={styles.popup__form} onSubmit={handleSubmit}>
                <input type="text" placeholder="Categoria *" />
                <textarea rows={5} placeholder="Descrição *"></textarea>

                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                        <span
                            className="button primary outline"
                            onClick={() => setCategoryFormIsOpen(false)}>
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