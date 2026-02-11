import { PiNotePencil, PiPlusCircle, PiTrash } from "react-icons/pi"
import styles from "./List.module.css"
import Checkbox from "../../../../Form/Checkbox"
import { useState } from "react"
import Modal from "react-modal"
import Delete from "../Delete"
import CategoryForm from "../CategoryForm"

const Categories = () => {
    const [categoryFormIsOpen, setCategoryFormIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)

    return (
        <>
            <section>
                <header className={styles.plates__title}>
                    <h2>Lista de categorias</h2>

                    <button
                        className="button primary small"
                        onClick={() => setCategoryFormIsOpen(true)}>
                        <PiPlusCircle />
                        Nova categoria
                    </button>
                </header>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Categoria</th>
                            <th>Descrição</th>
                            <th className="centered">Ações</th>
                        </tr>
                    </thead>

                    <thead className="not-hidden">
                        <tr>
                            <th>
                                <Checkbox
                                    id="select-all-categories"
                                    className={styles.plate__checkbox} />
                            </th>

                            <th>
                                <label htmlFor="select-all-categories">
                                    Selecionar todos
                                </label>
                            </th>

                            <th colSpan={2}>
                                <button className="button clear">
                                    Cancelar
                                </button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <Checkbox className={styles.plate__checkbox} />
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

                            <td className="centered">
                                <p className={styles.plate__actions}>
                                    <button
                                        className="button clear"
                                        title="Editar categoria"
                                        onClick={() => setCategoryFormIsOpen(true)}>
                                        <PiNotePencil />
                                    </button>

                                    <button
                                        className="button clear"
                                        title="Excluit categoria"
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

                            <td className="centered">
                                <p className={styles.plate__actions}>
                                    <button
                                        className="button clear"
                                        title="Editar categoria"
                                        onClick={() => setCategoryFormIsOpen(true)}>
                                        <PiNotePencil />
                                    </button>

                                    <button
                                        className="button clear"
                                        title="Excluit categoria"
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

                            <td className="centered">
                                <p className={styles.plate__actions}>
                                    <button
                                        className="button clear"
                                        title="Editar categoria"
                                        onClick={() => setCategoryFormIsOpen(true)}>
                                        <PiNotePencil />
                                    </button>

                                    <button
                                        className="button clear"
                                        title="Excluit categoria"
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
                        onClick={() => setDeleteIsOpen(true)}>
                        Excluir
                    </button>
                </p>
            </section>
            <Modal
                isOpen={categoryFormIsOpen}
                onRequestClose={() => setCategoryFormIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <CategoryForm
                    setCategoryFormIsOpen={setCategoryFormIsOpen}
                    title="Nova categoria" />
            </Modal>


            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <Delete
                    setModalIsOpen={setDeleteIsOpen}
                    title="Excluir categoria?"
                    itemToDelete="category" />
            </Modal>
        </>
    )
}

export default Categories