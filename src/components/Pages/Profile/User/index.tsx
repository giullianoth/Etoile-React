import { PiNotePencil } from "react-icons/pi"
import type { IUser } from "../../../../types/user"
import Container from "../../../Container"
import Photo from "../Photo"
import styles from "./User.module.css"

type Props = {
    user: IUser
}

const User = ({ user }: Props) => {
    return (
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

                        <button className="button primary outline small">
                            <PiNotePencil />
                            Editar perfil / Alterar senha
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default User