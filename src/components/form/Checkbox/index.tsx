import { useRef, type ComponentProps } from "react"
import styles from "./Checkbox.module.css"
import { PiCheck } from "react-icons/pi"

const Checkbox = (props: ComponentProps<"input">) => {
    const checkboxRef = useRef<HTMLInputElement | null>(null)

    return (
        <span
            className={styles.checkbox + (checkboxRef?.current?.checked ? ` ${styles.checked}` : "")}>
            <input ref={checkboxRef} type="checkbox" {...props} />
            <PiCheck />
        </span>
    )
}

export default Checkbox