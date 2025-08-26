import type { MouseEventHandler, ReactNode } from "react"
import styles from "./Bullet.module.css"

type Props = {
    children?: ReactNode
    type: "success" | "info" | "warning" | "error"
    onClick?: MouseEventHandler
}

const Bullet = ({ children, type, onClick }: Props) => {
    return (
        <div className={`${styles.bullet} ${styles[type]}`} onClick={onClick}>
            {children}
        </div>
    )
}

export default Bullet