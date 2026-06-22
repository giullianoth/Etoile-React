import { PiPlusCircle } from "react-icons/pi"
import styles from "./Users.module.css"
import UserRow from "../UserRow"
import { useAppContext } from "../../../../../context/app-context"
import Loading from "../../../../Loading"
import Trigger from "../../../../Trigger"
import { useEffect, useState, type ChangeEvent } from "react"
import type { IUser } from "../../../../../types/user"
import Checkbox from "../../../../Form/Checkbox"
import Modal from "../../../../Modal"
import UserForm from "../UserForm"
import DeleteUsers from "../DeleteUsers"

const Users = () => {
    const [selectedUsersInfo, setSelectedUsersInfo] = useState<{ user: IUser, selected: boolean }[]>([])
    const selectedUsers = selectedUsersInfo.filter(info => info.selected).map(info => info.user)
    const [allUsersSelected, setAllUsersSelected] = useState<boolean>(false)
    const [createIsOpen, setCreateIsOpen] = useState<boolean>(false)
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)
    const [usersToModify, setUsersToModify] = useState<IUser[]>([])

    const {
        fetching,
        fetchErrorMessage,
        users,
        handleFetchUsers,
        handleSetUserToEdit,
        currentUser,
    } = useAppContext().users

    useEffect(() => {
        const fetchUsersData = async () => {
            await handleFetchUsers()
        }

        fetchUsersData()
    }, [handleFetchUsers])

    useEffect(() => {
        const arrangeUsers = () => {
            if (users) {
                setSelectedUsersInfo(users.map(user => ({
                    user,
                    selected: false
                })))
            }
        }

        arrangeUsers()
    }, [users])

    const handleSelectUser = (userId: string, selected: boolean) => {
        setSelectedUsersInfo(prevUsers => prevUsers.map(prevUser => {
            if (prevUser.user._id === userId) {
                return {
                    ...prevUser,
                    selected
                }
            }
            return prevUser
        }))
    }

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target
        setAllUsersSelected(checked)

        setSelectedUsersInfo(prevUsers => prevUsers.map(info => ({
            ...info,
            selected: checked
        })))
    }

    const handleOpenDelete = (usersToDelete: IUser[]) => {
        setUsersToModify(usersToDelete)
        setDeleteIsOpen(true)
    }

    return (
        <>
            <section>
                <header className={styles.users__title}>
                    <h2>Lista de usuários</h2>

                    <button
                        className="button primary small"
                        onClick={() => setCreateIsOpen(true)}>
                        <PiPlusCircle />
                        Novo perfil
                    </button>
                </header>

                {fetching
                    ? <Loading />

                    : fetchErrorMessage
                        ? <Trigger type="error">{fetchErrorMessage}</Trigger>

                        : selectedUsersInfo.length
                            ? <>
                                <table>
                                    {selectedUsers.length
                                        ? <thead className="not-hidden">
                                            <tr>
                                                <th>
                                                    <Checkbox
                                                        id="select-all-users"
                                                        className={styles.user__checkbox}
                                                        checked={allUsersSelected}
                                                        onChange={handleSelectAll} />
                                                </th>

                                                <th colSpan={6}>
                                                    <label htmlFor="select-all-users">
                                                        Selecionar todos
                                                    </label>
                                                </th>
                                            </tr>
                                        </thead>

                                        : <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>Cliente</th>
                                                <th>Papel</th>
                                                <th>E-mail</th>
                                                <th>Telefone</th>
                                                <th className="centered">Ação</th>
                                            </tr>
                                        </thead>}
                                    <tbody>
                                        {selectedUsersInfo.map(info => (
                                            <UserRow
                                                key={info.user._id}
                                                user={info.user}
                                                selected={info.selected}
                                                selecting={selectedUsers.length > 0}
                                                onSelect={handleSelectUser}
                                                onOpenEdit={() => setEditIsOpen(true)}
                                                onOpenDelete={() => handleOpenDelete([info.user])} />
                                        ))}
                                    </tbody>
                                </table>

                                {selectedUsers.length > 0 &&
                                    <p className={styles.users__actions}>
                                        <strong>Ações em massa:</strong>

                                        <button
                                            className="button clear small"
                                            onClick={() => handleOpenDelete(selectedUsers)}>
                                            Excluir
                                        </button>
                                    </p>}
                            </>

                            : <Trigger type="warning">Ainda não há usuários cadastrados.</Trigger>}
            </section>

            <Modal
                isOpen={createIsOpen}
                onRequestClose={() => setCreateIsOpen(false)}
                onAfterClose={() => handleSetUserToEdit(null)}>
                <UserForm
                    action="create"
                    onClosePopup={() => setCreateIsOpen(false)} />
            </Modal>

            <Modal
                isOpen={editIsOpen}
                onRequestClose={() => setEditIsOpen(false)}
                onAfterClose={() => handleSetUserToEdit(null)}>
                {currentUser &&
                    <UserForm
                        action="update"
                        onClosePopup={() => setEditIsOpen(false)} />}
            </Modal>

            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}
                onAfterClose={() => setUsersToModify([])}>
                {usersToModify.length > 0 &&
                    <DeleteUsers
                        usersToDelete={usersToModify}
                        willDeleteMany={selectedUsers.length > 0}
                        onClosePopup={() => setDeleteIsOpen(false)} />}
            </Modal>
        </>
    )
}

export default Users