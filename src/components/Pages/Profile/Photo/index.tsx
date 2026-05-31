import { PiCameraBold, PiCheck, PiX } from "react-icons/pi"
import styles from "./Photo.module.css"
import avatar from "/images/user.png"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import Trigger from "../../../Trigger"
import { uploadsURL } from "../../../../services/api"
import { useAppContext } from "../../../../context/app-context"
import type { IUser } from "../../../../types/user"
import Loading from "../../../Loading"

type Props = {
    className?: string
    user: IUser
}

const Photo = ({ className, user }: Props) => {
    const [previewImage, setPreviewImage] = useState<File | null>(null)
    const { addMessage } = useAppContext().message

    const {
        handleSetUserToEdit,
        handleUpdateUserPhoto,
        loading,
        success,
        successMessage,
        errorMessage,
        handleResetUsers
    } = useAppContext().users

    useEffect(() => {
        if (user) {
            handleSetUserToEdit(user)
        }

        return () => {
            handleSetUserToEdit(null)
            handleResetUsers()
        }
    }, [handleSetUserToEdit, user, handleResetUsers])

    useEffect(() => {
        if (errorMessage) {
            addMessage(errorMessage, "error")
        }

        if (success && successMessage) {
            addMessage(successMessage)
        }

        handleResetUsers()
    }, [addMessage, errorMessage, success, successMessage, handleResetUsers])

    const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setPreviewImage(file || null)
        handleSetUserToEdit(user)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (previewImage) {
            await handleUpdateUserPhoto(previewImage)
        }

        setPreviewImage(null)
    }

    return (
        <form
            className={styles.photo + (className ? ` ${className}` : "")}
            onSubmit={handleSubmit}>
            <img
                src={
                    previewImage || user.photo
                        ? previewImage
                            ? URL.createObjectURL(previewImage)
                            : `${uploadsURL}/users/${user.photo}`
                        : avatar
                }
                alt={user.fullname} />

            <label className={styles.photo__change} title="Alterar foto de perfil">
                <PiCameraBold />
                <input
                    type="file"
                    name="photo"
                    onChange={handleChangePhoto} />
            </label>

            {previewImage &&
                <div className={styles.photo__confirm}>
                    {loading
                        ? <Loading small />

                        : <>
                            <button
                                type="button"
                                className="button clear"
                                title="Cancelar"
                                onClick={() => setPreviewImage(null)}>
                                <Trigger type="error" icon={<PiX />}>
                                    {""}
                                </Trigger>
                            </button>

                            <button
                                type="submit"
                                className="button clear"
                                title="Confirmar">
                                <Trigger type="success" icon={<PiCheck />}>
                                    {""}
                                </Trigger>
                            </button>
                        </>}
                </div>
            }
        </form>
    )
}

export default Photo