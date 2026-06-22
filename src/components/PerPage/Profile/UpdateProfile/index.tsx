import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import type { IUserUpdate } from "../../../../types/user"
import styles from "../../../Popup/Popup.module.css"
import Popup from "../../../Popup"
import Checkbox from "../../../Form/Checkbox"
import Password from "../../../Form/Password"
import AnimateHeight from "react-animate-height"
import { useAppContext } from "../../../../context/app-context"
import Loading from "../../../Loading"
import Trigger from "../../../Trigger"

type Props = {
    onClosePopup: () => void
}

const UpdateProfile = ({ onClosePopup }: Props) => {
    const [formData, setFormData] = useState<Partial<IUserUpdate>>({})
    const [changePassword, setChangePassword] = useState<boolean>(false)
    const { addMessage } = useAppContext().message

    const {
        currentUser,
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleUpdateUser,
    } = useAppContext().users

    useEffect(() => {
        const initializeFormData = () => {
            if (currentUser) {
                const { fullname, phone } = currentUser

                if (phone) {
                    setFormData({ fullname, phone })
                } else {
                    setFormData({ fullname })
                }
            }
        }

        initializeFormData()
    }, [currentUser])

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            onClosePopup()
        }
    }, [addMessage, mutateSuccess, mutateSuccessMessage, onClosePopup])

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

    const handleSubmitAndUpdateProfile = async (event: FormEvent) => {
        event.preventDefault()

        if (!currentUser) {
            return
        }

        const userData: Partial<IUserUpdate> = { ...formData, changePassword }
        await handleUpdateUser(userData, currentUser._id)
    }

    return (
        <Popup>
            {currentUser
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>Atualize seus dados</h2>
                    </div>

                    <form className={styles.popup__form} onSubmit={handleSubmitAndUpdateProfile}>
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
                                onClick={onClosePopup}
                                disabled={mutating}>
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="button primary"
                                disabled={mutating}>
                                Atualizar
                                {mutating && <Loading inButton />}
                            </button>
                        </div>
                    </form>

                    {mutateErrorMessage && <Trigger type="error">{mutateErrorMessage}</Trigger>}
                </>

                : <Trigger type="error">Erro ao carregar perfil. Tente de novo.</Trigger>}
        </Popup>
    )
}

export default UpdateProfile