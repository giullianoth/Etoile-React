import type { ReactNode } from "react"
import styles from "./Popup.module.css"

type Props = {
    children?: ReactNode
}

const Popup = ({ children }: Props) => {
    return (
        <div className={styles.popup}>
            {children}
        </div>
    )
}

export default Popup