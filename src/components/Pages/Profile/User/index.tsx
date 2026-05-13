import { PiNotePencil } from "react-icons/pi"
import Container from "../../../Container"
import Photo from "../Photo"
import styles from "./User.module.css"
import { useState } from "react"
import UpdateProfile from "../UpdateProfile"
import Modal from "../../../Modal"

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
                onRequestClose={() => setModalIsOpen(false)}>
                <UpdateProfile onCloseUpdateUser={() => setModalIsOpen(false)} />
            </Modal>
        </>
    )
}

export default User