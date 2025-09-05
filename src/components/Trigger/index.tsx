import type { ReactNode } from "react"
import styles from "./Trigger.module.css"
import type { BulletType } from "../Bullet"
import Bullet from "../Bullet"

type Props = {
    children?: ReactNode
    type: BulletType
    small?: boolean
    floating?: boolean
    className?: string
}

const Trigger = ({ type, children, small, floating, className }: Props) => {
    return (
        <Bullet
            type={type}
            small={small}
            className={styles.trigger
                + (floating ? ` ${styles.floating}` : "")
                + (className ? ` ${className}` : "")}>
            {children}
        </Bullet>
    )
}

export default Trigger