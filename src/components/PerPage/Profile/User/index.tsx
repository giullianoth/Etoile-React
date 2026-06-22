import { useState } from "react"
import { useAppContext } from "../../../../context/app-context"
import Container from "../../../Container"
import Photo from "../../../Photo"
import styles from "./User.module.css"
import Modal from "../../../Modal"
import UpdateProfile from "../UpdateProfile"

const User = () => {
    const { user } = useAppContext().auth
    const { currentUser, handleSetUserToEdit } = useAppContext().users
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const handleOpenUpdate = () => {
        setModalIsOpen(true)
        handleSetUserToEdit(user)
    }

    return (
        <>
            <section className={styles.user}>
                <Container className={styles.user__container}>
                    {user &&
                        <>
                            <Photo className={styles.user__photo} user={user} />

                            <div className={styles.user__info}>
                                <header className={styles.user__name}>
                                    <h2>Perfil de {user.fullname}</h2>
                                </header>

                                <div className={styles.user__edit}>
                                    <span>{user.email}</span>

                                    <button
                                        className="button primary outline small"
                                        onClick={handleOpenUpdate}>
                                        Editar perfil / Alterar senha
                                    </button>
                                </div>
                            </div>
                        </>}
                </Container>
            </section>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onAfterClose={() => handleSetUserToEdit(null)}>
                {currentUser &&
                    <UpdateProfile onClosePopup={() => setModalIsOpen(false)} />}
            </Modal>
        </>
    )
}

export default User