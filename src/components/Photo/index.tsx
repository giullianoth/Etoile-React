import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import type { IUser } from "../../types/user"
import styles from "./Photo.module.css"
import avatar from "/images/user.png"
import { uploadsURL } from "../../services/api"
import { PiCameraBold, PiCheck, PiX } from "react-icons/pi"
import Trigger from "../Trigger"
import { useAppContext } from "../../context/app-context"
import Loading from "../Loading"

type Props = {
    user: IUser
    className?: string
}

const Photo = ({ user, className }: Props) => {
    const [photoPreview, setPhotoPreview] = useState<File | null>(null)
    const { addMessage } = useAppContext().message

    const {
        handleSetUserToEdit,
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleUpdatePhoto,
    } = useAppContext().users

    useEffect(() => {
        if (user) {
            handleSetUserToEdit(user)
        }
    }, [handleSetUserToEdit, user])

    useEffect(() => {
        if (mutateErrorMessage) {
            addMessage(mutateErrorMessage, "error")
        }

        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
        }
    }, [addMessage, mutateSuccess, mutateSuccessMessage, mutateErrorMessage])

    const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setPhotoPreview(file || null)
    }

    const handleSubmitAndUpdatePhoto = async (event: FormEvent) => {
        event.preventDefault()
        await handleUpdatePhoto(photoPreview, user._id)
        setPhotoPreview(null)
    }

    return (
        <form
            onSubmit={handleSubmitAndUpdatePhoto}
            className={styles.photo + (className ? ` ${className}` : "")}>
            <img
                src={
                    photoPreview || user.photo
                        ? photoPreview
                            ? URL.createObjectURL(photoPreview)
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

            {photoPreview &&
                <div className={styles.photo__confirm}>
                    {mutating
                        ? <Loading small />

                        : <>
                            <button
                                type="button"
                                className="button clear"
                                title="Cancelar"
                                onClick={() => setPhotoPreview(null)}>
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
                </div>}
        </form>
    )
}

export default Photo