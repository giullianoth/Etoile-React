import { PiNotePencil } from "react-icons/pi"
import Container from "../../../Container"
import styles from "./User.module.css"
import Modal from "react-modal"
import { useState } from "react"
import EditProfile from "../Edit/Profile"
import Photo from "../Photo"
import type { IUser } from "../../../../types/user"

type Props = {
    user: IUser
}

const User = ({ user }: Props) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    return (
        user &&
        <>
            <section className={styles.user}>
                <Container className={styles.user__container}>
                    <Photo currentPhoto={user.photo} />

                    <div className={styles.user__info}>
                        <header className={styles.user__name}>
                            <h2>Perfil de {user.fullname}</h2>
                        </header>

                        <div className={styles.user__email}>
                            <span>{user.email}</span>

                            <button className="button primary outline small" onClick={() => setModalIsOpen(true)}>
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
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <EditProfile
                    onCancel={() => setModalIsOpen(false)}
                    user={user} />
            </Modal>
        </>
    )
}

export default User