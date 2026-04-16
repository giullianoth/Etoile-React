import styles from "../../../Popup/Popup.module.css"
import Popup from "../../../Popup"
import AnimateHeight from "react-animate-height"
import Password from "../../../Form/Password"
import Checkbox from "../../../Form/Checkbox"
import type { IUserUpdate } from "../../../../types/user"
import { useState, type ChangeEvent, type FormEvent } from "react"

type Props = {
    onCloseUpdateUser: () => void
}

const UpdateProfile = ({ onCloseUpdateUser }: Props) => {
    const [formData, setFormData] = useState<Partial<IUserUpdate>>({})
    const [changePassword, setChangePassword] = useState<boolean>(false)

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        console.log(formData)
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
                    value={formData.fullname}
                    onChange={handleChangeFormData} />

                <input
                    type="text"
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleChangeFormData} />

                <label className={styles.popup__checkField}>
                    <Checkbox
                        name="changePassword"
                        checked={changePassword}
                        onChange={event => setChangePassword(event.target.checked)} />

                    <span>Redefinir a senha</span>
                </label>

                <AnimateHeight
                    duration={300}
                    height={changePassword ? "auto" : 0}
                    contentClassName={styles.popup__form}>
                    <Password
                        name="password"
                        placeholder="Senha atual"
                        value={formData.password}
                        onChange={handleChangeFormData} />

                    <Password
                        name="newPassword"
                        placeholder="Nova senha"
                        value={formData.newPassword}
                        onChange={handleChangeFormData} />

                    <Password
                        name="confirmPassword"
                        placeholder="Confirmar senha"
                        value={formData.confirmPassword}
                        onChange={handleChangeFormData} />
                </AnimateHeight>

                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                    <button
                        type="button"
                        className="button primary outline"
                        onClick={onCloseUpdateUser}>
                        Cancelar
                    </button>

                    <button type="submit" className="button primary">
                        Atualizar
                    </button>
                </div>
            </form>
        </Popup>
    )
}

export default UpdateProfile