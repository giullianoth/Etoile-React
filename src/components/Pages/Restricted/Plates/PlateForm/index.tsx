import type { Dispatch, FormEvent, SetStateAction } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import Checkbox from "../../../../Form/Checkbox"
import { PiCamera } from "react-icons/pi"

type Props = {
    title: string
    setPlateFormIsOpen: Dispatch<SetStateAction<boolean>>
}

const PlateForm = ({ title, setPlateFormIsOpen }: Props) => {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
    }

    return (
        <Popup divided>
            <div className={styles.popup__half}>
                <img
                    src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png"
                    alt="Prato"
                    className={styles.popup__preview} />

                <label
                    htmlFor="plate-image"
                    className={styles.popup__previewButton}
                    title="Adicionar foto">
                    <PiCamera />
                </label>
            </div>

            <div className={styles.popup__half}>
                <div className={styles.popup__heading}>
                    <h2>{title}</h2>
                </div>

                <form className={styles.popup__form} onSubmit={handleSubmit}>
                    <input type="file" id="plate-image" />
                    <input type="text" placeholder="Prato *" />
                    <textarea placeholder="Descrição *"></textarea>
                    <input type="text" placeholder="Ingredientes *" />

                    <label className={styles.popup__checkField}>
                        <Checkbox />
                        <span>Disponível</span>
                    </label>

                    <select>
                        <option value="Entradas">Entradas</option>
                        <option value="Outra categoria">Outra categoria</option>
                    </select>

                    <input type="number" placeholder="Preço *" />
                    <input type="text" placeholder="Acompanhamento" />

                    <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
                        <span
                            className="button primary outline"
                            onClick={() => setPlateFormIsOpen(false)}>
                            Cancelar
                        </span>

                        <button
                            type="submit"
                            className="button primary">
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </Popup>
    )
}

export default PlateForm