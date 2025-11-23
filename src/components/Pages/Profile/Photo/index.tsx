import { PiCameraBold } from "react-icons/pi"
import styles from "./Photo.module.css"
import avatar from "/images/user.png"

type Props = {
    photo?: string
    userName: string
    className?: string
}

const Photo = ({ photo, userName, className }: Props) => {
    return (
        <div className={styles.photo + (className ? ` ${className}` : "")}>
            <img src={photo ?? avatar} alt={userName} />

            <label className={styles.photo__change} title="Alterar foto de perfil">
                <PiCameraBold />
                <input type="file" name="photo" />
            </label>
        </div>
    )
}

export default Photo