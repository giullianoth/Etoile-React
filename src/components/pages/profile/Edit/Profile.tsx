import { useEffect, useState, type FormEvent, type MouseEventHandler } from "react"
import styles from "./Edit.module.css"
import Collapse from "react-animate-height"
import Checkbox from "../../../Checkbox"
import type { IUser } from "../../../../interfaces/user"

type Props = {
    onCancel: MouseEventHandler
    user: IUser
}

const EditProfile = ({ onCancel, user }: Props) => {
    const [fullname, setFullname] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirnPassword] = useState<string>("")
    const [changePassword, setChangePassword] = useState<boolean>(false)

    useEffect(() => {
        if (user) {
            setFullname(user.fullname)
            setPhone(user.phone ?? "")
        }
    }, [])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log({ fullname, phone, changePassword, currentPassword, newPassword, confirmPassword })
    }

    return (
        <section className={styles.edit}>
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
                    required
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
                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Senha atual"
                        required={changePassword}
                        value={currentPassword ?? ""}
                        onChange={event => setCurrentPassword(event.target.value)} />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Nova senha"
                        required={changePassword}
                        value={newPassword ?? ""}
                        onChange={event => setNewPassword(event.target.value)} />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar nova senha"
                        required={changePassword}
                        value={confirmPassword ?? ""}
                        onChange={event => setConfirnPassword(event.target.value)} />
                </Collapse>

                <div className={styles.edit__formSubmit}>
                    <span className="button primary outline" onClick={onCancel}>Cancelar</span>
                    <button type="submit" className="button primary">Atualizar</button>
                </div>
            </form>
        </section>
    )
}

export default EditProfile