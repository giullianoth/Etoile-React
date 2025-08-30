import { useEffect, useState, type MouseEventHandler, type ReactNode } from "react"
import styles from "./Bullet.module.css"
import { PiCheckCircle, PiInfo, PiWarningCircle, PiXCircle } from "react-icons/pi"

type Props = {
    children?: ReactNode
    type: BulletType
    onClick?: MouseEventHandler
    small?: boolean
    iconComponent?: ReactNode
    className?: string
}

export type BulletType = "success" | "info" | "warning" | "error"

const Bullet = ({ children, type, onClick, small, iconComponent, className }: Props) => {
    const [icon, setIcon] = useState<ReactNode | null>(null)

    useEffect(() => {
        switch (type) {
            case "success":
                setIcon(iconComponent ?? <PiCheckCircle />)
                break

            case "info":
                setIcon(iconComponent ?? <PiInfo />)
                break

            case "warning":
                setIcon(iconComponent ?? <PiWarningCircle />)
                break

            case "error":
                setIcon(iconComponent ?? <PiXCircle />)
                break
        }
    }, [type])

    return (
        <div
            className={`${styles.bullet} ${styles[type]}`
                + (small ? ` ${styles.small}` : "")
                + (className ? ` ${className}` : "")}
            onClick={onClick}>
            {icon}
            <span>{children}</span>
        </div>
    )
}

export default Bullet