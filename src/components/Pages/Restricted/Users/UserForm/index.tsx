import { useState, type ChangeEvent, type FormEvent } from "react"
import styles from "../../../../Popup/Popup.module.css"
import Popup from "../../../../Popup"
import { PiCamera } from "react-icons/pi"
import AnimateHeight from "react-animate-height"
import Checkbox from "../../../../Form/Checkbox"
import type { IUserUpdate } from "../../../../../types/user"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import SelectWithLabel from "../../../../Form/InputWithLabel/SelectWithLabel"
import PasswordWithLabel from "../../../../Form/InputWithLabel/PasswordWithLabel"
import avatar from "/images/user.png"

type Props = {
    onCloseUserForm: () => void
    title: string
}

const UserForm = ({ title, onCloseUserForm }: Props) => {
    const [changePassword, setChangePassword] = useState<boolean>(false)
    const [formData, setFormData] = useState<Partial<IUserUpdate>>({ role: "user" })
    const [photoPreview, setPhotoPreview] = useState<File | null>(null)

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setPhotoPreview(file || null)
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log(formData, changePassword, photoPreview)
        onCloseUserForm()
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>{title}</h2>
            </div>

            <form className={styles.popup__form} onSubmit={handleSubmit}>
                <div className={styles.popup__file}>
                    <img
                        src={
                            photoPreview
                                ? URL.createObjectURL(photoPreview)
                                : avatar
                        }
                        alt={"Nome"} />

                    <label title="Adicionar foto">
                        <PiCamera />
                        <input type="file" name="photo" onChange={handleChangePhoto} />
                    </label>
                </div>

                <InputWithLabel
                    label="Nome completo"
                    type="text"
                    // required
                    name="fullname"
                    value={formData.fullname || ""}
                    onChange={handleChangeFormData} />

                <InputWithLabel
                    label="E-mail"
                    type="email"
                    // required
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChangeFormData} />

                <SelectWithLabel
                    label="Perfil"
                    required
                    name="role"
                    value={formData.role}
                    onChange={handleChangeFormData}>
                    <option value="user">Cliente</option>
                    <option value="admin">Administrador</option>
                </SelectWithLabel>

                <InputWithLabel
                    label="Telefone"
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChangeFormData} />

                <label className={styles.popup__checkField}>
                    <Checkbox
                        checked={changePassword}
                        onChange={event => setChangePassword(event.target.checked)} />

                    <span>Redefinir a senha</span>
                </label>

                <AnimateHeight
                    duration={300}
                    height={changePassword ? "auto" : 0}
                    contentClassName={styles.popup__form}>
                    <PasswordWithLabel
                        label="Senha"
                        // required
                        name="password"
                        value={formData.password || ""}
                        onChange={handleChangeFormData} />

                    <PasswordWithLabel
                        label="Confirmar senha"
                        // required
                        name="confirmPassword"
                        value={formData.confirmPassword || ""}
                        onChange={handleChangeFormData} />
                </AnimateHeight>

                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                    <span
                        className="button primary outline"
                        onClick={onCloseUserForm}>
                        Voltar
                    </span>

                    <button
                        type="submit"
                        className="button primary">
                        Criar
                    </button>
                </div>
            </form>
        </Popup>
    )
}

export default UserForm