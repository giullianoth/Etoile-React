import { PiCamera, PiNotePencil } from "react-icons/pi"
import Container from "../../../Container"
import styles from "./User.module.css"
import Modal from "react-modal"
import { useState } from "react"
import EditProfile from "../EditProfile"

const User = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(true)

    return (
        <>
            <section className={styles.user}>
                <Container className={styles.user__container}>
                    <div className={styles.user__photo}>
                        <img src="/images/avatar.jpg" alt="Giulliano Guimarães" />

                        <label className={styles.user__photoChange} title="Alterar foto de perfil">
                            <PiCamera />
                            <input type="file" name="photo" />
                        </label>
                    </div>

                    <div className={styles.user__info}>
                        <header className={styles.user__name}>
                            <h2>Perfil de Giulliano Guimarães</h2>
                        </header>

                        <div className={styles.user__email}>
                            <span>giulliano@email.com</span>

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
                <EditProfile onCancel={() => setModalIsOpen(false)} />
            </Modal>
        </>
    )
}

export default User