import styles from "../../../Popup/Popup.module.css"
import Popup from "../../../Popup"
import AnimateHeight from "react-animate-height"
import Password from "../../../Form/Password"
import Checkbox from "../../../Form/Checkbox"
import type { IUser, IUserUpdate } from "../../../../types/user"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useAppContext } from "../../../../context/app-context"
import Loading from "../../../Loading"
import Trigger from "../../../Trigger"

type Props = {
    onCloseUpdateUser: () => void
    user: IUser
}

const UpdateProfile = ({ onCloseUpdateUser, user }: Props) => {
    const [formData, setFormData] = useState<Partial<IUserUpdate>>({})
    const [changePassword, setChangePassword] = useState<boolean>(false)
    const { addMessage } = useAppContext().message

    const {
        handleUpdateUser,
        loading,
        errorMessage,
        success,
        successMessage,
        handleResetUsers
    } = useAppContext().users

    useEffect(() => {
        if (user) {
            const { fullname, phone } = user

            if (phone) {
                setFormData({ fullname, phone })
            } else {
                setFormData({ fullname })
            }
        }
    }, [user])

    useEffect(() => {
        if (success && successMessage) {
            addMessage(successMessage)
            handleResetUsers()
            onCloseUpdateUser()
        }
    }, [addMessage, success, successMessage, onCloseUpdateUser, handleResetUsers])

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleAllowChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setChangePassword(event.target.checked)

        if (!event.target.checked) {
            delete formData.password
            delete formData.newPassword
            delete formData.confirmPassword
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const userToUpdate: Partial<IUserUpdate> = { ...formData, changePassword }
        await handleUpdateUser(userToUpdate)
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Atualize seus dados</h2>
            </div>

            <form className={styles.popup__form} onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    name="fullname"
                    placeholder="Nome completo"
                    value={formData.fullname || ""}
                    onChange={handleChangeFormData} />

                <input
                    type="text"
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone || ""}
                    onChange={handleChangeFormData} />

                <label className={styles.popup__checkField}>
                    <Checkbox
                        name="changePassword"
                        checked={changePassword}
                        onChange={handleAllowChangePassword} />

                    <span>Redefinir a senha</span>
                </label>

                <AnimateHeight
                    duration={300}
                    height={changePassword ? "auto" : 0}
                    contentClassName={styles.popup__form}>
                    <Password
                        name="password"
                        placeholder="Senha atual"
                        value={formData.password || ""}
                        onChange={handleChangeFormData} />

                    <Password
                        name="newPassword"
                        placeholder="Nova senha"
                        value={formData.newPassword || ""}
                        onChange={handleChangeFormData} />

                    <Password
                        name="confirmPassword"
                        placeholder="Confirmar senha"
                        value={formData.confirmPassword || ""}
                        onChange={handleChangeFormData} />
                </AnimateHeight>

                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                    <button
                        type="button"
                        className="button primary outline"
                        onClick={onCloseUpdateUser}
                        disabled={loading}>
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="button primary"
                        disabled={loading}>
                        Atualizar
                        {loading && <Loading inButton />}
                    </button>
                </div>

                {errorMessage && <Trigger type="error">{errorMessage}</Trigger>}
            </form>
        </Popup>
    )
}

export default UpdateProfile