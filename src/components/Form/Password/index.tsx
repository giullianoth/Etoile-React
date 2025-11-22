import { useRef, useState, type ComponentProps } from "react"
import styles from "./Password.module.css"
import { PiEye, PiEyeSlash } from "react-icons/pi"

const Password = (props: ComponentProps<"input">) => {
    const [inputType, setInputType] = useState<"text" | "password">("password")
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleChangeInputType = () => {
        setInputType(
            inputType === "password" ? "text" : "password"
        )

        inputRef?.current?.focus()
    }

    return (
        <span className={styles.password}>
            <input ref={inputRef} type={inputType} {...props} />

            <span
                className={styles.password__icon}
                onClick={handleChangeInputType}>
                {inputType === "password" && <PiEye />}
                {inputType === "text" && <PiEyeSlash />}
            </span>
        </span>
    )
}

export default Password