import { useEffect, useState, type FormEvent } from "react"
import styles from "./Edit.module.css"
import Collapse from "react-animate-height"
import Checkbox from "../../../form/Checkbox"
import type { IUser, IUserUpdate } from "../../../../interfaces/user"
import { useAppContext } from "../../../../context/context"
import Loading from "../../../Loading"
import Trigger from "../../../Trigger"
import Password from "../../../form/Password"

type Props = {
    onCancel: () => void
    user: IUser
}

const EditProfile = ({ onCancel, user }: Props) => {
    const [fullname, setFullname] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [changePassword, setChangePassword] = useState<boolean>(false)
    const { usersState, updateUser } = useAppContext().users
    const { errorMessage, loading, success } = usersState

    useEffect(() => {
        if (user) {
            setFullname(user.fullname)
            setPhone(user.phone ?? "")
        }
    }, [user])

    useEffect(() => {
        if (success) {
            onCancel()
        }
    }, [usersState])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const userData: Partial<IUserUpdate> = { fullname, confirmPassword }

        if (phone) {
            userData.phone = phone
        }

        if (confirmPassword) {
            userData.password = currentPassword
            userData.newPassword = newPassword
            userData.confirmPassword = confirmPassword
        }

        await updateUser(user._id, userData)
    }

    return (
        <section className={styles.edit}>
            <div className={styles.edit__container}>
                <header className={`section-heading ${styles.edit__title}`}>
                    <h2>Atualizar seus dados</h2>
                </header>

                <form className={styles.edit__form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        required
                        value={fullname ?? ""}
                        onChange={event => setFullname(event.target.value)} />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Telefone"
                        value={phone ?? ""}
                        onChange={event => setPhone(event.target.value)} />

                    <label className={styles.edit__formCheck}>
                        <Checkbox
                            name="changePassword"
                            checked={changePassword}
                            onChange={event => setChangePassword(event.target.checked)} />

                        <span>Redefinir a senha</span>
                    </label>

                    <Collapse
                        height={changePassword ? "auto" : 0}
                        duration={300}
                        contentClassName={styles.edit__formPassword}>
                        <Password
                            name="currentPassword"
                            placeholder="Senha atual"
                            value={currentPassword ?? ""}
                            onChange={event => setCurrentPassword(event.target.value)} />

                        <Password
                            name="newPassword"
                            placeholder="Nova senha"
                            value={newPassword ?? ""}
                            onChange={event => setNewPassword(event.target.value)} />

                        <Password
                            name="confirmPassword"
                            placeholder="Confirmar nova senha"
                            value={confirmPassword ?? ""}
                            onChange={event => setConfirmPassword(event.target.value)} />
                    </Collapse>

                    <div className={styles.edit__formSubmit}>
                        <span className="button primary outline" onClick={onCancel}>Cancelar</span>

                        <button type="submit" className="button primary" disabled={loading}>
                            {loading ? <Loading inButton /> : "Atualizar"}
                        </button>
                    </div>
                </form>

                {errorMessage &&
                    <Trigger
                        type="error"
                        className={styles.edit__message}>{errorMessage}</Trigger>}
            </div>
        </section>
    )
}

export default EditProfile