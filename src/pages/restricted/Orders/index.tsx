import { useState, type MouseEvent } from "react"
import Checkbox from "../../../components/Form/Checkbox"
import styles from "./Orders.module.css"
import Modal from "react-modal"
import EditOrder from "../../../components/Pages/Restricted/Orders/EditOrder"
import { PiPlusCircle, PiTrash } from "react-icons/pi"
import DeleteOrder from "../../../components/Pages/Restricted/Orders/DeleteOrder"
import SetAsCancelled from "../../../components/Pages/Restricted/Orders/SetAsCancelled"
import CreateOrder from "../../../components/Pages/Restricted/Orders/CreateOrder"

const Orders = () => {
    const [createIsOpen, setCreateIsOpen] = useState<boolean>(false)
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)
    const [cancelIsOpen, setCancelIsOpen] = useState<boolean>(false)

    const handleOpenDelete = (event: MouseEvent) => {
        event.stopPropagation()
        setDeleteIsOpen(true)
    }

    return (
        <>
            <section>
                <header className={styles.orders__title}>
                    <h2>Lista de pedidos</h2>

                    <button className="button primary small" onClick={() => setCreateIsOpen(true)}>
                        <PiPlusCircle />
                        Novo pedido
                    </button>
                </header>

                <table className={styles.orders__list}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Status</th>
                            <th>Data de comparecimento</th>
                            <th>Horário</th>
                            <th>Cliente</th>
                            <th>Itens</th>
                            <th className="centered">Ações</th>
                        </tr>
                    </thead>

                    <thead className="not-hidden">
                        <tr>
                            <th>
                                <Checkbox
                                id="select-all-orders"
                                    className={styles.order__checkbox} />
                            </th>

                            <th>
                                <label htmlFor="select-all-orders">
                                    Selecionar todos
                                </label>
                            </th>

                            <th colSpan={5}>
                                <button className="button clear">
                                    Cancelar
                                </button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            className={`${styles.order__row} ${styles.order__pending}`}
                            onClick={() => setEditIsOpen(true)}>
                            <td>
                                <Checkbox
                                    className={styles.order__checkbox}
                                    onClick={event => event.stopPropagation()} />
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Status:</strong>&nbsp;
                                </span>
                                Pendente
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Data de comparecimento:</strong>&nbsp;
                                </span>
                                09/02/2026
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Horário de comparecimento:</strong>&nbsp;
                                </span>
                                12:00
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Cliente:</strong>&nbsp;
                                </span>
                                Giulliano Guimarães
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Itens:</strong>&nbsp;
                                </span>
                                While Grain Bread, Grilled Salmon, Smoked Sordfish...
                            </td>

                            <td className="centered">
                                <p>
                                    <button
                                        className="button clear"
                                        title="Excluit pedido"
                                        onClick={handleOpenDelete}>
                                        <PiTrash />
                                    </button>
                                </p>
                            </td>
                        </tr>

                        <tr className={`${styles.order__row} ${styles.order__completed}`}>
                            <td>
                                <Checkbox
                                    className={styles.order__checkbox}
                                    onClick={event => event.stopPropagation()} />
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Status:</strong>&nbsp;
                                </span>
                                Concluído
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Data de comparecimento:</strong>&nbsp;
                                </span>
                                09/02/2026
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Horário:</strong>&nbsp;
                                </span>
                                12:00
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Cliente:</strong>&nbsp;
                                </span>
                                Giulliano Guimarães
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Itens:</strong>&nbsp;
                                </span>
                                While Grain Bread, Grilled Salmon, Smoked Sordfish...
                            </td>

                            <td className="centered">
                                <p>
                                    <button
                                        className="button clear"
                                        title="Excluit pedido"
                                        onClick={handleOpenDelete}>
                                        <PiTrash />
                                    </button>
                                </p>
                            </td>
                        </tr>

                        <tr className={`${styles.order__row} ${styles.order__cancelled}`}>
                            <td>
                                <Checkbox
                                    className={styles.order__checkbox}
                                    onClick={event => event.stopPropagation()} />
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Status:</strong>&nbsp;
                                </span>
                                Cancelado
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Data de comparecimento:</strong>&nbsp;
                                </span>
                                09/02/2026
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Horário de comparecimento:</strong>&nbsp;
                                </span>
                                12:00
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Cliente:</strong>&nbsp;
                                </span>
                                Giulliano Guimarães
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Itens:</strong>&nbsp;
                                </span>
                                While Grain Bread, Grilled Salmon, Smoked Sordfish...
                            </td>

                            <td className="centered">
                                <p>
                                    <button
                                        className="button clear"
                                        title="Excluit pedido"
                                        onClick={handleOpenDelete}>
                                        <PiTrash />
                                    </button>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className={styles.orders__actions}>
                    <strong>Ações em massa:</strong>

                    <button
                        className="button clear small"
                        onClick={() => setCancelIsOpen(true)}>
                        Marcar como Cancelado
                    </button>

                    <button
                        className="button clear small"
                        onClick={handleOpenDelete}>
                        Excluir
                    </button>
                </p>
            </section>

            <Modal
                isOpen={createIsOpen}
                onRequestClose={() => setCreateIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <CreateOrder setModalIsOpen={setCreateIsOpen} />
            </Modal>

            <Modal
                isOpen={editIsOpen}
                onRequestClose={() => setEditIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <EditOrder
                    setModalIsOpen={setEditIsOpen} />
            </Modal>

            <Modal
                isOpen={cancelIsOpen}
                onRequestClose={() => setCancelIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <SetAsCancelled setModalIsOpen={setCancelIsOpen} />
            </Modal>

            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <DeleteOrder
                    title="Excluir pedido?"
                    setModalIsOpen={setDeleteIsOpen} />
            </Modal>
        </>
    )
}

export default Orders