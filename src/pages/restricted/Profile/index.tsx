import { PiSignOut } from "react-icons/pi"
import styles from "./Profile.module.css"
import Photo from "../../../components/Pages/Profile/Photo"
import { useState, type ChangeEvent, type FormEvent } from "react"
import Checkbox from "../../../components/Form/Checkbox"
import AnimateHeight from "react-animate-height"
import { useNavigate } from "react-router-dom"
import type { IUserUpdate } from "../../../types/user"
import InputWithLabel from "../../../components/Form/InputWithLabel/InputWithLabel"
import PasswordWithLabel from "../../../components/Form/InputWithLabel/PasswordWithLabel"

const Profile = () => {
    const navigate = useNavigate()
    const [changePassword, setChangePassword] = useState<boolean>(false)
    const [formData, setFormData] = useState<Partial<IUserUpdate>>({})

    const handleLogoutAccount = () => {
        navigate("/admin")
    }

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log(formData, changePassword)
    }

    return (
        <section>
            <header className={styles.profile__title}>
                <h2>Perfil de Giulliano Guimarães</h2>

                <button
                    className="button primary small"
                    title="Sair"
                    onClick={handleLogoutAccount}>
                    Logout
                    <PiSignOut />
                </button>
            </header>

            <div className={styles.profile__container}>
                <div className={styles.profile__photo}>
                    <Photo />
                </div>

                <div className={styles.profile__form}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.profile__formRow}>
                            <InputWithLabel
                                label="Nome completo"
                                required
                                type="text"
                                name="fullname"
                                value={formData.fullname || ""}
                                onChange={handleChangeFormData} />

                            <InputWithLabel
                                label="Telefone"
                                type="text"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleChangeFormData} />
                        </div>

                        <label className={styles.profile__checkField}>
                            <Checkbox
                                checked={changePassword}
                                onChange={event => setChangePassword(event.target.checked)} />

                            <span>Redefinir a senha</span>
                        </label>

                        <AnimateHeight
                            duration={300}
                            height={changePassword ? "auto" : 0}
                            contentClassName={styles.profile__formRow}>
                            <PasswordWithLabel
                                label="Senha atual"
                                name="password"
                                value={formData.password || ""}
                                onChange={handleChangeFormData} />

                            <PasswordWithLabel
                                label="Nova senha"
                                name="newPassword"
                                value={formData.newPassword || ""}
                                onChange={handleChangeFormData} />

                            <PasswordWithLabel
                                label="Confirmar senha"
                                name="confirmPassword"
                                value={formData.confirmPassword || ""}
                                onChange={handleChangeFormData} />
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