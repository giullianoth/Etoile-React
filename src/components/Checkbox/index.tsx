import { useRef, type ComponentProps } from "react"
import styles from "./Checkbox.module.css"
import { PiCheck } from "react-icons/pi"

type Props = ComponentProps<"input">

const Checkbox = ({ ...rest }: Props) => {
    const checkboxRef = useRef<HTMLInputElement | null>(null)

    return (
        <span
            className={styles.checkbox + (checkboxRef?.current?.checked ? ` ${styles.checked}` : "")}>
            <input ref={checkboxRef} type="checkbox" {...rest} />
            <PiCheck />
        </span>
    )
}

export default Checkbox