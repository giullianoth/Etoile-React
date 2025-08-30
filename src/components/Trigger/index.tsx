import type { ReactNode } from "react"
import styles from "./Trigger.module.css"
import type { BulletType } from "../Bullet"
import Bullet from "../Bullet"

type Props = {
    children?: ReactNode
    type: BulletType
    small?: boolean
    floating?: boolean
}

const Trigger = ({ type, children, small, floating }: Props) => {
    return (
        <Bullet
            type={type}
            small={small}
            className={styles.trigger + (floating ? ` ${styles.floating}` : "")}>
            {children}
        </Bullet>
    )
}

export default Trigger