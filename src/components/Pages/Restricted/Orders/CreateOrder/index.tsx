import { PiMinus, PiPlus, PiTrash } from "react-icons/pi"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react"
import Checkbox from "../../../../Form/Checkbox"

type Props = {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateOrder = ({ setModalIsOpen }: Props) => {
    const [step, setStep] = useState<1 | 2>(1)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Novo pedido</h2>
            </div>

            {step === 1 &&
                <div className={styles.popup__form}>
                    <p>
                        <strong className={styles.popup__strongDetached}>Cliente</strong>
                    </p>

                    <select>
                        <option value="Giulliano Guimarães">Giulliano Guimarães</option>
                        <option value="Giulliano Guimarães">Giulliano Tharso</option>
                        <option value="Giulliano Guimarães">Giulliano Martins</option>
                    </select>

                    <p>
                        <strong className={styles.popup__strongDetached}>Selecionar itens</strong>
                    </p>

                    <div className={styles.popup_list}>
                        <div className={styles.popup__listItem}>
                            <div className={styles.popup__listAction}>
                                <Checkbox />
                            </div>

                            <div className={styles.popup__listImage}>
                                <img src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png" alt="Plate" />
                            </div>

                            <div className={`${styles.popup__listInfo} ${styles.popup__listInfoCentered}`}>
                                <p className={`${styles.popup__listName} ${styles.popup__listSmall}`}>
                                    <strong>While Grain Bread</strong>
                                </p>

                                <div className={`${styles.popup__listDetails} ${styles.popup__listQuantity}`}>
                                    <button className="button primary small">
                                        <PiMinus />
                                    </button>

                                    <div className={styles.popup__quantity}>1</div>

                                    <button className="button primary small">
                                        <PiPlus />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.popup__listItem}>
                            <div className={styles.popup__listAction}>
                                <Checkbox />
                            </div>

                            <div className={styles.popup__listImage}>
                                <img src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png" alt="Plate" />
                            </div>

                            <div className={`${styles.popup__listInfo} ${styles.popup__listInfoCentered}`}>
                                <p className={`${styles.popup__listName} ${styles.popup__listSmall}`}>
                                    <strong>While Grain Bread</strong>
                                </p>

                                <div className={`${styles.popup__listDetails} ${styles.popup__listQuantity}`}>
                                    <button className="button primary small">
                                        <PiMinus />
                                    </button>

                                    <div className={styles.popup__quantity}>1</div>

                                    <button className="button primary small">
                                        <PiPlus />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.popup__listItem}>
                            <div className={styles.popup__listAction}>
                                <Checkbox />
                            </div>

                            <div className={styles.popup__listImage}>
                                <img src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png" alt="Plate" />
                            </div>

                            <div className={`${styles.popup__listInfo} ${styles.popup__listInfoCentered}`}>
                                <p className={`${styles.popup__listName} ${styles.popup__listSmall}`}>
                                    <strong>While Grain Bread</strong>
                                </p>

                                <div className={`${styles.popup__listDetails} ${styles.popup__listQuantity}`}>
                                    <button className="button primary small">
                                        <PiMinus />
                                    </button>

                                    <div className={styles.popup__quantity}>1</div>

                                    <button className="button primary small">
                                        <PiPlus />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.popup__action} ${styles.popup__ended} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={() => setModalIsOpen(false)}>Voltar</button>

                        <button
                            className="button primary"
                            onClick={() => setStep(2)}>
                            Próximo
                        </button>
                    </div>
                </div>}

            {step === 2 &&
                <form className={styles.popup__form} onSubmit={handleSubmit}>
                    <input type="date" placeholder="Data de comparecimento" />
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
                            onClick={() => setStep(1)}>
                            Voltar
                        </span>

                        <button
                            type="submit"
                            className="button primary">
                            Criar
                        </button>
                    </div>
                </form>}
        </Popup>
    )
}

export default CreateOrder