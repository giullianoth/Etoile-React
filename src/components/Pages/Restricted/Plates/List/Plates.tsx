import { PiCheckCircle, PiEmpty, PiNotePencil, PiPlusCircle, PiTrash } from "react-icons/pi"
import styles from "./List.module.css"
import { useState } from "react"
import Checkbox from "../../../../Form/Checkbox"
import Modal from "react-modal"
import PlateForm from "../PlateForm"
import Delete from "../Delete"
import SetAvailability from "../SetAvailability"

const Plates = () => {
    const [plateFormIsOpen, setPlateFormIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)
    const [changeAvailabilityIsOpen, setChangeAvailabilityIsOpen] = useState<boolean>(false)

    return (
        <>
            <section className={styles.plates}>
                <header className={styles.plates__title}>
                    <h2>Lista de pratos</h2>

                    <button className="button primary small" onClick={() => setPlateFormIsOpen(true)}>
                        <PiPlusCircle />
                        Novo prato
                    </button>
                </header>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Prato</th>
                            <th>Disponível</th>
                            <th>Categoria</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th className="centered">Ações</th>
                        </tr>
                    </thead>

                    <thead className="not-hidden">
                        <tr>
                            <th>
                                <Checkbox className={styles.plate__checkbox} />
                            </th>

                            <th colSpan={7}>Selecionar todos</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <Checkbox className={styles.plate__checkbox} />
                            </td>
                            <td className={styles.plate__image}>
                                <img src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png" alt="Prato" />
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Prato:</strong>&nbsp;
                                </span>
                                Shrimp and Vegetable Salad
                            </td>

                            <td className="centered">
                                <span className="label-on-cell">
                                    <strong>Disponível:</strong>&nbsp;
                                </span>
                                <PiCheckCircle className={styles.plate__available} />
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Categoria:</strong>&nbsp;
                                </span>
                                Entradas
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Descrição:</strong>&nbsp;
                                </span>
                                A fresh mixed seafood salad with cooked...
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Preço:</strong>&nbsp;
                                </span>
                                $ 10,00
                            </td>

                            <td className="centered">
                                <p className={styles.plate__actions}>
                                    <button
                                        className="button clear"
                                        title="Editar prato"
                                        onClick={() => setPlateFormIsOpen(true)}>
                                        <PiNotePencil />
                                    </button>

                                    <button
                                        className="button clear"
                                        title="Excluit prato"
                                        onClick={() => setDeleteIsOpen(true)}>
                                        <PiTrash />
                                    </button>
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Checkbox className={styles.plate__checkbox} />
                            </td>
                            <td className={styles.plate__image}>
                                <img src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png" alt="Prato" />
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Prato:</strong>&nbsp;
                                </span>
                                Shrimp and Vegetable Salad
                            </td>

                            <td className="centered">
                                <span className="label-on-cell">
                                    <strong>Disponível:</strong>&nbsp;
                                </span>
                                <PiEmpty className={styles.plate__notAvailable} />
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Categoria:</strong>&nbsp;
                                </span>
                                Entradas
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Descrição:</strong>&nbsp;
                                </span>
                                A fresh mixed seafood salad with cooked...
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Preço:</strong>&nbsp;
                                </span>
                                $ 10,00
                            </td>

                            <td className="centered">
                                <p className={styles.plate__actions}>
                                    <button
                                        className="button clear"
                                        title="Editar prato"
                                        onClick={() => setPlateFormIsOpen(true)}>
                                        <PiNotePencil />
                                    </button>

                                    <button
                                        className="button clear"
                                        title="Excluit prato"
                                        onClick={() => setDeleteIsOpen(true)}>
                                        <PiTrash />
                                    </button>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className={styles.plates__actions}>
                    <strong>Ações em massa:</strong>

                    <button
                        className="button clear small"
                        onClick={() => setChangeAvailabilityIsOpen(true)}>
                        Marcar como Indisponível
                    </button>

                    <button
                        className="button clear small"
                        onClick={() => setChangeAvailabilityIsOpen(true)}>
                        Marcar como Disponível
                    </button>

                    <button
                        className="button clear small"
                        onClick={() => setDeleteIsOpen(true)}>
                        Excluir
                    </button>
                </p>
            </section>

            <Modal
                isOpen={plateFormIsOpen}
                onRequestClose={() => setPlateFormIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <PlateForm
                    title="Novo prato"
                    setPlateFormIsOpen={setPlateFormIsOpen} />
            </Modal>

            <Modal
                isOpen={changeAvailabilityIsOpen}
                onRequestClose={() => setChangeAvailabilityIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <SetAvailability
                    setModalIsOpen={setChangeAvailabilityIsOpen}
                    availability="available" />
            </Modal>

            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <Delete
                    setModalIsOpen={setDeleteIsOpen}
                    title="Excluir prato?"
                    itemToDelete="plate" />
            </Modal>
        </>
    )
}

export default Plates