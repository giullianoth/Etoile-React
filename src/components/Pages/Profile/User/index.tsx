import { PiNotePencil } from "react-icons/pi"
import type { IUser } from "../../../../types/user"
import Container from "../../../Container"
import Photo from "../Photo"
import styles from "./User.module.css"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import UpdateProfile from "../UpdateProfile"
import { useAppContext } from "../../../../context/context"

type Props = {
    user: IUser
}

const User = ({ user }: Props) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const { handleClearUsersData } = useAppContext().users

    useEffect(() => {
        handleClearUsersData()
    }, [modalIsOpen, handleClearUsersData])

    return (
        <>
            <section className={styles.user}>
                <Container className={styles.user__container}>
                    <Photo
                        photo={user.photo}
                        userName={user.fullname}
                        className={styles.user__photo} />

                    <div className={styles.user__info}>
                        <header className={styles.user__name}>
                            <h2>Perfil de {user.fullname}</h2>
                        </header>

                        <div className={styles.user__edit}>
                            <span>{user.email}</span>

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
                <UpdateProfile
                    user={user}
                    setModalIsOpen={setModalIsOpen} />
            </Modal>
        </>
    )
}

export default User