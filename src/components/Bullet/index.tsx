import type { MouseEventHandler, ReactNode } from "react"
import styles from "./Bullet.module.css"

type Props = {
    children?: ReactNode
    type: BulletType
    onClick?: MouseEventHandler
}

export type BulletType = "success" | "info" | "warning" | "error"

const Bullet = ({ children, type, onClick }: Props) => {
    return (
        <div className={`${styles.bullet} ${styles[type]}`} onClick={onClick}>
            {children}
        </div>
    )
}

export default Bullet