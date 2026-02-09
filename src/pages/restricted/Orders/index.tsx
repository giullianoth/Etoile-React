import { useState } from "react"
import Checkbox from "../../../components/Form/Checkbox"
import styles from "./Orders.module.css"
import Modal from "react-modal"
import EditOrder from "../../../components/Pages/Restricted/Orders/EditOrder"

const Orders = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    return (
        <>
            <section>
                <header className={styles.orders__title}>
                    <h2>Lista de pedidos</h2>
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
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            className={`${styles.order__row} ${styles.order__pending}`}
                            onClick={() => setModalIsOpen(true)}>
                            <td>
                                <Checkbox className={styles.order__checkbox} />
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
                        </tr>

                        <tr className={`${styles.order__row} ${styles.order__completed}`}>
                            <td>
                                <Checkbox className={styles.order__checkbox} />
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
                        </tr>

                        <tr className={`${styles.order__row} ${styles.order__cancelled}`}>
                            <td>
                                <Checkbox className={styles.order__checkbox} />
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
                        </tr>
                    </tbody>
                </table>
            </section>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <EditOrder
                    setModalIsOpen={setModalIsOpen} />
            </Modal>
        </>
    )
}

export default Orders