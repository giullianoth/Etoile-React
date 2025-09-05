import { useRef, useState, type ComponentProps } from "react"
import styles from "./Password.module.css"
import { PiEye, PiEyeSlash } from "react-icons/pi"

type Props = ComponentProps<"input">

const Password = ({ ...props }: Props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleChangeInput = () => {
        setShowPassword(!showPassword)
        inputRef.current?.focus()
    }

    return (
        <span className={styles.password}>
            <input ref={inputRef} type={showPassword ? "text" : "password"} {...props} />

            <span
                className={styles.icon}
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                onClick={handleChangeInput}>
                {showPassword ? <PiEyeSlash /> : <PiEye />}
            </span>
        </span>
    )
}

export default Password