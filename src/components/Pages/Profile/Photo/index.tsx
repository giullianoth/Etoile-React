import { PiCameraBold, PiCheck, PiX } from "react-icons/pi"
import styles from "./Photo.module.css"
import avatar from "/images/user.png"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import Trigger from "../../../Trigger"
import { uploadsURL } from "../../../../services/api"
import { useAppContext } from "../../../../context/context"
import Loading from "../../../Loading"

type Props = {
    photo?: string
    userName: string
    className: string
}

const Photo = ({ photo, userName, className }: Props) => {
    const [previewImage, setPreviewImage] = useState<File | null>(null)

    const { user } = useAppContext().auth
    const { addMessage } = useAppContext().message

    const {
        loading,
        errorMessage,
        successMessage,
        success,
        handleUpdateUserPhoto,
        handleSetUserToEdit,
        handleClearUsersFormFields
    } = useAppContext().users

    useEffect(() => {
        handleClearUsersFormFields()
        handleSetUserToEdit(user)
    }, [previewImage])

    useEffect(() => {
        if (errorMessage) {
            addMessage(errorMessage, "error")
        }

        if (success && successMessage) {
            addMessage(successMessage)
            setPreviewImage(null)
        }
    }, [errorMessage, success, successMessage, handleUpdateUserPhoto])

    const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setPreviewImage(file || null)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        await handleUpdateUserPhoto(previewImage!)
    }

    return (
        <form className={`${styles.photo} ${className}`} onSubmit={handleSubmit}>
            <img
                src={
                    photo || previewImage
                        ? (previewImage
                            ? URL.createObjectURL(previewImage)
                            : `${uploadsURL}/users/${photo}`)
                        : avatar
                }
                alt={userName} />

            <label className={styles.photo__change} title="Alterar foto de perfil">
                <PiCameraBold />
                <input
                    type="file"
                    name="photo"
                    onChange={handleChangePhoto} />
            </label>

            {previewImage &&
                (loading
                    ? <Loading
                        small
                        className={styles.photo__confirm} />

                    : <div className={styles.photo__confirm}>
                        <span
                            title="Cancelar"
                            onClick={() => setPreviewImage(null)}>
                            <Trigger type="error" icon={<PiX />}>
                                {""}
                            </Trigger>
                        </span>

                        <button
                            type="submit"
                            className="button clear"
                            title="Confirmar">
                            <Trigger type="success" icon={<PiCheck />}>
                                {""}
                            </Trigger>
                        </button>
                    </div>
                )}
        </form>
    )
}

export default Photo