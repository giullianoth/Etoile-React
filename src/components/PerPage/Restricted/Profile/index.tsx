import { PiSignOut } from "react-icons/pi"
import styles from "./Profile.module.css"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import AnimateHeight from "react-animate-height"
import { useNavigate } from "react-router-dom"
import type { IUserUpdate } from "../../../../types/user"
import Photo from "../../../Photo"
import InputWithLabel from "../../../Form/InputWithLabel/InputWithLabel"
import Checkbox from "../../../Form/Checkbox"
import PasswordWithLabel from "../../../Form/InputWithLabel/PasswordWithLabel"
import { useAppContext } from "../../../../context/app-context"
import Trigger from "../../../Trigger"
import Loading from "../../../Loading"

const Profile = () => {
    const navigate = useNavigate()
    const [changePassword, setChangePassword] = useState<boolean>(false)
    const [formData, setFormData] = useState<Partial<IUserUpdate>>({})
    const { user, handleLogout, handleResetAuthMessages } = useAppContext().auth
    const { addMessage } = useAppContext().message

    const {
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleUpdateUser,
        handleSetUserToEdit,
    } = useAppContext().users

    const handleLogoutAccount = () => {
        handleLogout()
        handleResetAuthMessages()
        navigate("/admin")
    }

    useEffect(() => {
        const placeFormFields = () => {
            if (user) {
                setFormData({
                    fullname: user.fullname,
                    phone: user.phone || ""
                })

                handleSetUserToEdit(user)
            }
        }

        placeFormFields()
    }, [user, handleSetUserToEdit])

    useEffect(() => {
        const confirmUpdatedProfile = () => {
            if (mutateSuccess && mutateSuccessMessage) {
                addMessage(mutateSuccessMessage)
                setChangePassword(false)

                setFormData(prevData => {
                    delete prevData.password
                    delete prevData.newPassword
                    delete prevData.confirmPassword
                    return prevData
                })
            }
        }

        confirmUpdatedProfile()
    }, [addMessage, mutateSuccess, mutateSuccessMessage])

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleAllowChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setChangePassword(event.target.checked)

        if (!event.target.checked) {
            setFormData(prevData => {
                delete prevData.password
                delete prevData.newPassword
                delete prevData.confirmPassword
                return prevData
            })
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (!user) {
            return
        }

        const userData: Partial<IUserUpdate> = { ...formData, changePassword }
        await handleUpdateUser(userData, user._id, null, true, true)
    }

    return (
        user
            ? <section>
                <header className={styles.profile__title}>
                    <div>
                        <h2>Perfil de {user.fullname}</h2>
                        <p>
                            <strong>{user.email}</strong>
                        </p>
                    </div>

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
                        <Photo user={user} />
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
                                    onChange={handleChangeFormData}
                                    disabled={mutating} />

                                <InputWithLabel
                                    label="Telefone"
                                    type="text"
                                    name="phone"
                                    value={formData.phone || ""}
                                    onChange={handleChangeFormData}
                                    disabled={mutating} />
                            </div>

                            <label className={styles.profile__checkField}>
                                <Checkbox
                                    checked={changePassword}
                                    onChange={handleAllowChangePassword}
                                    disabled={mutating} />

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
                                    onChange={handleChangeFormData}
                                    disabled={mutating} />

                                <PasswordWithLabel
                                    label="Nova senha"
                                    name="newPassword"
                                    value={formData.newPassword || ""}
                                    onChange={handleChangeFormData}
                                    disabled={mutating} />

                                <PasswordWithLabel
                                    label="Confirmar senha"
                                    name="confirmPassword"
                                    value={formData.confirmPassword || ""}
                                    onChange={handleChangeFormData}
                                    disabled={mutating} />
                            </AnimateHeight>

                            <button
                                type="submit"
                                className="button primary"
                                disabled={mutating}>
                                Salvar dados
                                {mutating && <Loading inButton />}
                            </button>

                            {mutateErrorMessage && <Trigger type="error">{mutateErrorMessage}</Trigger>}
                        </form>
                    </div>
                </div>
            </section>

            : <Trigger type="error">Erro ao carregar perfil. Tente de novo.</Trigger>
    )
}

export default Profile