import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import type { IUserCreate, IUserUpdate } from "../../../../../types/user"
import { PiCamera } from "react-icons/pi"
import avatar from "/images/user.png"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import SelectWithLabel from "../../../../Form/InputWithLabel/SelectWithLabel"
import Checkbox from "../../../../Form/Checkbox"
import AnimateHeight from "react-animate-height"
import PasswordWithLabel from "../../../../Form/InputWithLabel/PasswordWithLabel"
import { useAppContext } from "../../../../../context/app-context"
import Loading from "../../../../Loading"
import Trigger from "../../../../Trigger"
import { uploadsURL } from "../../../../../services/api"

type Props = {
    action: "create" | "update"
    onClosePopup: () => void
}

const UserForm = ({ onClosePopup, action }: Props) => {
    const [changePassword, setChangePassword] = useState<boolean>(false)
    const [formData, setFormData] = useState<Partial<IUserUpdate> | Partial<IUserUpdate>>({})
    const [photoPreview, setPhotoPreview] = useState<File | null>(null)
    const { addMessage } = useAppContext().message
    const { user } = useAppContext().auth

    const {
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleCreateUser,
        handleResetUsersMessage,
        currentUser,
        handleUpdateUser,
    } = useAppContext().users

    useEffect(() => {
        const loadFormFields = () => {
            if (currentUser) {
                setFormData({
                    fullname: currentUser.fullname,
                    email: currentUser.email,
                    role: currentUser.role,
                    phone: currentUser.phone || "",
                })
            } else {
                setFormData(({ role: "user" }))
            }
        }

        loadFormFields()
    }, [currentUser])

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            handleResetUsersMessage()
            onClosePopup()
        }
    }, [mutateSuccess, mutateSuccessMessage, addMessage, handleResetUsersMessage, onClosePopup])

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

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const userToCreate: Partial<IUserCreate> = { ...formData }
        const userToUpdate: Partial<IUserUpdate> = { ...formData }

        switch (action) {
            case "create":
                await handleCreateUser(userToCreate, photoPreview)
                break

            case "update":
                if (currentUser && user) {
                    userToUpdate.changePassword = changePassword

                    await handleUpdateUser(
                        userToUpdate,
                        currentUser._id,
                        photoPreview,
                        true,
                        currentUser._id === user._id,
                    )
                }
                break
        }
    }

    return (
        <Popup>
            <>
                <div className={styles.popup__heading}>
                    <h2>{action === "create" ? "Criar" : "Editar"} usuário</h2>
                </div>

                <form className={styles.popup__form} onSubmit={handleSubmit}>
                    <div className={styles.popup__file}>
                        <img
                            src={
                                photoPreview
                                    ? URL.createObjectURL(photoPreview)
                                    : currentUser?.photo
                                        ? `${uploadsURL}/users/${currentUser.photo}`
                                        : avatar
                            }
                            alt="Selecionar foto de perfil" />

                        <label title="Adicionar foto">
                            <PiCamera />
                            <input type="file" name="photo" onChange={handleChangePhoto} />
                        </label>
                    </div>

                    <InputWithLabel
                        label="Nome completo"
                        type="text"
                        required
                        name="fullname"
                        value={formData.fullname || ""}
                        onChange={handleChangeFormData} />

                    <InputWithLabel
                        label="E-mail"
                        type="email"
                        required
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

                    {action === "update" &&
                        <label className={styles.popup__checkField}>
                            <Checkbox
                                checked={changePassword}
                                onChange={event => setChangePassword(event.target.checked)} />

                            <span>Redefinir a senha</span>
                        </label>}

                    {action === "create"
                        ? <>
                            <PasswordWithLabel
                                label="Senha"
                                required
                                name="password"
                                value={formData.password || ""}
                                onChange={handleChangeFormData} />

                            <PasswordWithLabel
                                label="Confirmar senha"
                                required
                                name="confirmPassword"
                                value={formData.confirmPassword || ""}
                                onChange={handleChangeFormData} />
                        </>

                        : <AnimateHeight
                            duration={300}
                            height={changePassword ? "auto" : 0}
                            contentClassName={styles.popup__form}>
                            <PasswordWithLabel
                                label="Nova senha"
                                name="password"
                                value={formData.password || ""}
                                onChange={handleChangeFormData} />

                            <PasswordWithLabel
                                label="Confirmar senha"
                                name="confirmPassword"
                                value={formData.confirmPassword || ""}
                                onChange={handleChangeFormData} />
                        </AnimateHeight>}

                    <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                        <button
                            type="button"
                            className="button primary outline"
                            onClick={onClosePopup}
                            disabled={mutating}>
                            Voltar
                        </button>

                        <button
                            type="submit"
                            className="button primary"
                            disabled={mutating}>
                            {action === "create" ? "Criar" : "Atualizar"}
                            {mutating && <Loading inButton />}
                        </button>
                    </div>
                </form>

                {mutateErrorMessage && <Trigger type="error">{mutateErrorMessage}</Trigger>}
            </>
        </Popup>
    )
}

export default UserForm