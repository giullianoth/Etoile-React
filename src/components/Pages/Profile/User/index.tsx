import { PiNotePencil } from "react-icons/pi"
import Container from "../../../Container"
import Photo from "../Photo"
import styles from "./User.module.css"
import { useState } from "react"
import UpdateProfile from "../UpdateProfile"
import Modal from "../../../Modal"
import { useAppContext } from "../../../../context/app-context"
import type { IUser } from "../../../../types/user"

const User = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const { user } = useAppContext().auth
    const { handleSetUserToEdit, currentUser } = useAppContext().users

    const handleOpenUpdate = () => {
        handleSetUserToEdit(user)
        setModalIsOpen(true)
    }

    return (
        <>
            <section className={styles.user}>
                <Container className={styles.user__container}>
                    {user &&
                        <Photo
                            className={styles.user__photo}
                            user={user} />}

                    <div className={styles.user__info}>
                        <header className={styles.user__name}>
                            <h2>Perfil de {user?.fullname}</h2>
                        </header>

                        <div className={styles.user__edit}>
                            <span>{user?.email}</span>

                            <button
                                className="button primary outline small"
                                onClick={handleOpenUpdate}>
                                <PiNotePencil />
                                Editar perfil / Alterar senha
                            </button>
                        </div>
                    </div>
                </Container>
            </section>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onAfterClose={() => handleSetUserToEdit(null)}>
                {currentUser &&
                    <UpdateProfile
                        user={user as IUser}
                        onCloseUpdateUser={() => setModalIsOpen(false)} />}
            </Modal>
        </>
    )
}

export default User