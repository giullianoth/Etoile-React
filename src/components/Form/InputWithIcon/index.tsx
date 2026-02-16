import type { ReactNode } from "react"
import styles from "./InputWithIcon.module.css"

type Props = {
    children: ReactNode,
    icon: ReactNode
}

const InputWithIcon = ({ children, icon }: Props) => {
    return (
        <span className={styles.input}>
            <span className={styles.input__icon}>
                {icon}
            </span>

            {children}
        </span>
    )
}

export default InputWithIcon