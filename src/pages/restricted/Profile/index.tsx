import { PiSignOut } from "react-icons/pi"
import styles from "./Profile.module.css"
import Photo from "../../../components/Pages/Profile/Photo"
import { useState, type FormEvent } from "react"
import Checkbox from "../../../components/Form/Checkbox"
import AnimateHeight from "react-animate-height"
import Password from "../../../components/Form/Password"

const Profile = () => {
    const [collapsed] = useState<boolean>(true)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
    }

    return (
        <section>
            <header className={styles.profile__title}>
                <h2>Perfil de Giulliano Guimarães</h2>

                <button className="button primary small">
                    Logout
                    <PiSignOut />
                </button>
            </header>

            <div className={styles.profile__container}>
                <div className={styles.profile__photo}>
                    <Photo
                        userName="Giulliano Guimarães" />
                </div>

                <div className={styles.profile__form}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.profile__formRow}>
                            <input type="text" placeholder="Nome completo *" />
                            <input type="text" placeholder="Telefone" />
                        </div>

                        <label className={styles.profile__checkField}>
                            <Checkbox />

                            <span>Redefinir a senha</span>
                        </label>

                        <AnimateHeight
                            duration={300}
                            height={collapsed ? "auto" : 0}
                            contentClassName={styles.profile__formRow}>
                                <Password placeholder="Senha *" />
                                <Password placeholder="Nova senha *" />
                                <Password placeholder="Confirmar senha *" />
                            </AnimateHeight>

                            <button type="submit" className="button primary">
                                Salvar dados
                            </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Profile