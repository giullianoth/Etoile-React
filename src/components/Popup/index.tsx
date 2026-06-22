import type { ReactNode } from "react"
import styles from "./Popup.module.css"

type Props = {
    children?: ReactNode
    divided?: boolean
}

const Popup = ({ children, divided }: Props) => {
    return (
        <div className={styles.popup + (divided ? ` ${styles.divided}` : "")}>
            {children}
        </div>
    )
}

export default Popup