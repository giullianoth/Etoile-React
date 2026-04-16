import { PiCameraBold, PiCheck, PiX } from "react-icons/pi"
import styles from "./Photo.module.css"
import avatar from "/images/user.png"
import { useState, type ChangeEvent, type FormEvent } from "react"
import Trigger from "../../../Trigger"

type Props = {
    className: string
}

const Photo = ({ className }: Props) => {
    const [previewImage, setPreviewImage] = useState<File | null>(null)

    const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setPreviewImage(file || null)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        console.log(previewImage)
    }

    return (
        <form className={`${styles.photo} ${className}`} onSubmit={handleSubmit}>
            <img
                src={
                    previewImage
                        ? URL.createObjectURL(previewImage)
                        : avatar
                }
                alt={"Nome"} />

            <label className={styles.photo__change} title="Alterar foto de perfil">
                <PiCameraBold />
                <input
                    type="file"
                    name="photo"
                    onChange={handleChangePhoto} />
            </label>

            {previewImage &&
                <div className={styles.photo__confirm}>
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
            }
        </form>
    )
}

export default Photo