import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react"
import styles from "../../../Popup/Popup.module.css"
import Popup from "../../../Popup"
import AnimateHeight from "react-animate-height"
import Password from "../../../Form/Password"
import { useAppContext } from "../../../../context/context"
import Checkbox from "../../../Form/Checkbox"
import type { IUser, IUserUpdate } from "../../../../types/user"
import Loading from "../../../Loading"
import Trigger from "../../../Trigger"

type Props = {
    user: IUser
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateProfile = ({ user, setModalIsOpen }: Props) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const { addMessage } = useAppContext().message
    const { handleClearAuthData } = useAppContext().auth

    const {
        userUpdateFormFields,
        handleChangeUsersUpdateFormFields,
        handleClearUsersFormFields,
        handleSetUserToEdit,
        loading,
        successMessage,
        errorMessage,
        success,
        handleUpdateUser
    } = useAppContext().users

    useEffect(() => {
        handleClearUsersFormFields()
        handleSetUserToEdit(user)
    }, [])

    useEffect(() => {
        if (success && successMessage) {
            addMessage(successMessage)
            handleClearAuthData()
            setModalIsOpen(false)
        }
    }, [success, successMessage, handleUpdateUser])

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "changePassword") {
            handleChangeUsersUpdateFormFields(
                event.target.name as keyof IUserUpdate,
                event.target.checked
            )

            setCollapsed(event.target.checked)
            return
        }

        handleChangeUsersUpdateFormFields(
            event.target.name as keyof IUserUpdate,
            event.target.value
        )
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        await handleUpdateUser()
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
                    value={userUpdateFormFields.fullname}
                    onChange={handleChangeFormData} />

                <input
                    type="text"
                    name="phone"
                    placeholder="Telefone"
                    value={userUpdateFormFields.phone}
                    onChange={handleChangeFormData} />

                <label className={styles.popup__checkField}>
                    <Checkbox
                        name="changePassword"
                        checked={userUpdateFormFields.changePassword}
                        onChange={handleChangeFormData} />

                    <span>Redefinir a senha</span>
                </label>

                <AnimateHeight
                    duration={300}
                    height={collapsed ? "auto" : 0}
                    contentClassName={styles.popup__form}>
                    <Password
                        name="password"
                        placeholder="Senha atual"
                        value={userUpdateFormFields.password}
                        onChange={handleChangeFormData} />

                    <Password
                        name="newPassword"
                        placeholder="Nova senha"
                        value={userUpdateFormFields.newPassword}
                        onChange={handleChangeFormData} />

                    <Password
                        name="confirmPassword"
                        placeholder="Confirmar senha"
                        value={userUpdateFormFields.confirmPassword}
                        onChange={handleChangeFormData} />
                </AnimateHeight>

                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                    <span
                        className="button primary outline"
                        onClick={() => setModalIsOpen(false)}>
                        Cancelar
                    </span>

                    <button type="submit" className="button primary" disabled={loading}>
                        Atualizar
                        {loading && <Loading inButton />}
                    </button>
                </div>

                {errorMessage &&
                    <Trigger type="error">{errorMessage}</Trigger>}
            </form>
        </Popup>
    )
}

export default UpdateProfile