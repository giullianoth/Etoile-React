import { PiCamera, PiCheckBold, PiXBold } from "react-icons/pi"
import styles from "./Photo.module.css"
import { useState, type ChangeEvent, type FormEvent } from "react"

type Props = {
    currentPhoto?: string
}

const Photo = ({ currentPhoto }: Props) => {
    const [photo, setPhoto] = useState<File | undefined>(undefined)
    const [photoPreview, setPhotoPreview] = useState<File | undefined>(undefined)
    const [confirm, setConfirm] = useState<boolean>(false)

    const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            setPhoto(file)
            setPhotoPreview(file)
            setConfirm(true)
        }
    }

    const handleCancelPhoto = () => {
        setConfirm(false)
        setPhoto(undefined)
        setPhotoPreview(undefined)
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log({ photo })
        setConfirm(false)
    }

    return (
        <div className={styles.photo}>
            <img
                src={photoPreview || currentPhoto
                    ? (photoPreview ? URL.createObjectURL(photoPreview) : `/images/users/${currentPhoto}`)
                    : "/images/user.png"
                }
                alt="Giulliano Guimarães" />

            <form onSubmit={handleSubmit}>
                <label className={styles.photo__change} title="Alterar foto de perfil">
                    <PiCamera />
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFile} />
                </label>

                {confirm &&
                    <div className={styles.photo__confirm}>
                        <span onClick={handleCancelPhoto}>
                            <PiXBold />
                        </span>

                        <button type="submit" className="button clear">
                            <PiCheckBold />
                        </button>
                    </div>}
            </form>
        </div>
    )
}

export default Photo