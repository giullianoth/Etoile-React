import { PiNotePencil } from "react-icons/pi"
import Container from "../../../Container"
import Photo from "../Photo"
import styles from "./User.module.css"
import { useState } from "react"
import Modal from "react-modal"
import UpdateProfile from "../UpdateProfile"

const User = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    return (
        <>
            <section className={styles.user}>
                <Container className={styles.user__container}>
                    <Photo className={styles.user__photo} />

                    <div className={styles.user__info}>
                        <header className={styles.user__name}>
                            <h2>Perfil de Usuário</h2>
                        </header>

                        <div className={styles.user__edit}>
                            <span>usuario.email.com</span>

                            <button
                                className="button primary outline small"
                                onClick={() => setModalIsOpen(true)}>
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
                <UpdateProfile onCloseUpdateUser={() => setModalIsOpen(false)} />
            </Modal>
        </>
    )
}

export default User