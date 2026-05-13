import { PiPlusCircle, PiTrash } from "react-icons/pi"
import styles from "./Users.module.css"
import Checkbox from "../../../components/Form/Checkbox"
import { useState, type MouseEvent } from "react"
import UserForm from "../../../components/Pages/Restricted/Users/UserForm"
import DeleteUser from "../../../components/Pages/Restricted/Users/DeleteUser"
import Modal from "../../../components/Modal"

const Users = () => {
    const [userFormIsOpen, setUserFormIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)

    const handleOpenDelete = (event: MouseEvent) => {
        event.stopPropagation()
        setDeleteIsOpen(true)
    }

    return (
        <>
            <section>
                <header className={styles.users__title}>
                    <h2>Lista de usuários</h2>

                    <button
                        className="button primary small"
                        onClick={() => setUserFormIsOpen(true)}>
                        <PiPlusCircle />
                        Novo perfil
                    </button>
                </header>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Cliente</th>
                            <th>Papel</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th className="centered">Ações</th>
                        </tr>
                    </thead>

                    <thead className="not-hidden">
                        <tr>
                            <th>
                                <Checkbox
                                    id="select-all-users"
                                    className={styles.user__checkbox} />
                            </th>

                            <th>
                                <label htmlFor="select-all-users">
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
                            className={styles.user__row}
                            onClick={() => setUserFormIsOpen(true)}>
                            <td>
                                <Checkbox
                                    className={styles.user__checkbox}
                                    onClick={event => event.stopPropagation()} />
                            </td>

                            <td className={`centered ${styles.user__image}`}>
                                <img src="/images/users/avatar.jpg" alt="Prato" />
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Cliente:</strong>&nbsp;
                                </span>
                                Giulliano Guimarães
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Papel:</strong>&nbsp;
                                </span>
                                Admin
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>E-mail:</strong>&nbsp;
                                </span>
                                giulliano@email.com
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Telefone:</strong>&nbsp;
                                </span>
                                900000000
                            </td>

                            <td className="centered">
                                <p className={styles.user__actions}>
                                    <button
                                        className="button clear"
                                        title="Excluit usuário"
                                        onClick={handleOpenDelete}>
                                        <PiTrash />
                                    </button>
                                </p>
                            </td>
                        </tr>

                        <tr
                            className={styles.user__row}>
                            <td>
                                <Checkbox
                                    className={styles.user__checkbox}
                                    onClick={event => event.stopPropagation()} />
                            </td>

                            <td className={`centered ${styles.user__image}`}>
                                <img src="/images/users/avatar.jpg" alt="Prato" />
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Cliente:</strong>&nbsp;
                                </span>
                                Giulliano Guimarães
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Papel:</strong>&nbsp;
                                </span>
                                Admin
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>E-mail:</strong>&nbsp;
                                </span>
                                giulliano@email.com
                            </td>

                            <td>
                                <span className="label-on-cell">
                                    <strong>Telefone:</strong>&nbsp;
                                </span>
                                900000000
                            </td>

                            <td className="centered">
                                <p className={styles.user__actions}>
                                    <button
                                        className="button clear"
                                        title="Excluit usuário"
                                        onClick={handleOpenDelete}>
                                        <PiTrash />
                                    </button>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className={styles.users__actions}>
                    <strong>Ações em massa:</strong>

                    <button
                        className="button clear small"
                        onClick={handleOpenDelete}>
                        Excluir
                    </button>
                </p>
            </section>

            <Modal
                isOpen={userFormIsOpen}
                onRequestClose={() => setUserFormIsOpen(false)}>
                <UserForm
                    onCloseUserForm={() => setUserFormIsOpen(false)}
                    title="Novo usuário" />
            </Modal>

            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}>
                <DeleteUser onCloseDelete={() => setDeleteIsOpen(false)} />
            </Modal>
        </>
    )
}

export default Users