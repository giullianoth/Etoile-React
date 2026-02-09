import { PiTrash } from "react-icons/pi"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import type { Dispatch, FormEvent, SetStateAction } from "react"

type Props = {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

const EditOrder = ({ setModalIsOpen }: Props) => {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Editar pedido</h2>
            </div>

            <form className={styles.popup__form} onSubmit={handleSubmit}>
                <input type="time" placeholder="Horário de comparecimento" />
                <select>
                    <option value="Pendente">Pendente</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Concluído">Concluído</option>
                </select>

                <div className={styles.popup_list}>
                    <h3 className={styles.popup__listItem}>Itens</h3>

                    <div className={styles.popup__listItem}>
                        <div className={styles.popup__listImage}>
                            <img src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png" alt="Plate" />
                        </div>

                        <div className={styles.popup__listInfo}>
                            <p className={`${styles.popup__listName} ${styles.popup__listSmall}`}>
                                <strong>While Grain Bread</strong>
                            </p>

                            <div className={styles.popup__listDetails}>
                                <input type="number" />
                            </div>
                        </div>

                        <div className={styles.popup__listAction}>
                            <span
                                className="button primary clear"
                                title="Excluir este item">
                                <PiTrash />
                            </span>
                        </div>
                    </div>

                    <div className={styles.popup__listItem}>
                        <div className={styles.popup__listImage}>
                            <img src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png" alt="Plate" />
                        </div>

                        <div className={styles.popup__listInfo}>
                            <p className={`${styles.popup__listName} ${styles.popup__listSmall}`}>
                                <strong>While Grain Bread</strong>
                            </p>

                            <div className={styles.popup__listDetails}>
                                <input type="number" />
                            </div>
                        </div>

                        <div className={styles.popup__listAction}>
                            <span
                                className="button primary clear"
                                title="Excluir este item">
                                <PiTrash />
                            </span>
                        </div>
                    </div>

                    <div className={styles.popup__listItem}>
                        <div className={styles.popup__listImage}>
                            <img src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png" alt="Plate" />
                        </div>

                        <div className={styles.popup__listInfo}>
                            <p className={`${styles.popup__listName} ${styles.popup__listSmall}`}>
                                <strong>While Grain Bread</strong>
                            </p>

                            <div className={styles.popup__listDetails}>
                                <input type="number" />
                            </div>
                        </div>

                        <div className={styles.popup__listAction}>
                            <span
                                className="button primary clear"
                                title="Excluir este item">
                                <PiTrash />
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                    <span
                        className="button primary outline"
                        onClick={() => setModalIsOpen(false)}>
                        Voltar
                    </span>

                    <button
                        type="submit"
                        className="button primary">
                        Confirmar
                    </button>
                </div>
            </form>
        </Popup>
    )
}

export default EditOrder