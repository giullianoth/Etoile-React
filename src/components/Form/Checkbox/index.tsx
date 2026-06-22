import type { ComponentProps } from "react"
import styles from "./Checkbox.module.css"
import { PiCheck } from "react-icons/pi"

const Checkbox = (props: ComponentProps<"input">) => {
    return (
        <span className={styles.checkbox}>
            <input type="checkbox" {...props} />
            <PiCheck />
        </span>
    )
}

export default Checkbox