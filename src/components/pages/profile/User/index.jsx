import Container from '../../../Container'
import styles from './User.module.css'
import userAvatar from "../../../../assets/images/avatar.jpg"
import SectionTitle from "../../../SectionTitle"

const User = () => {
  return (
    <section className={styles.user}>
        <Container spaced={true} className={styles.user__container}>
            <div className={styles.user__photo}>
                <img src={userAvatar} alt="Giulliano Guimarães" />
            </div>

            <div className={styles.user__info}>
                <SectionTitle className={styles.user__name}>Perfil de Giulliano Guimarães</SectionTitle>

                <p className={styles.user__email}>giulliano@email.com</p>
            </div>
        </Container>
    </section>
  )
}

export default User