import { useEffect, useState, type ReactNode } from "react"
import type { IMessageType } from "../../types/message"
import styles from "./Trigger.module.css"
import { PiCheckCircleThin, PiInfo, PiWarning, PiXCircle } from "react-icons/pi"

type Props = {
    children: ReactNode
    type: IMessageType
    bullet?: boolean
    floating?: boolean
    fading?: boolean
    icon?: ReactNode
}

const Trigger = ({ children, type, bullet, icon, floating, fading }: Props) => {
    const [currentIcon, setCurrentIcon] = useState<ReactNode | null>(null)

    useEffect(() => {
        switch (type) {
            case "success":
                setCurrentIcon(icon ?? <PiCheckCircleThin />)
                break

            case "info":
                setCurrentIcon(icon ?? <PiInfo />)
                break

            case "warning":
                setCurrentIcon(icon ?? <PiWarning />)
                break

            case "error":
                setCurrentIcon(icon ?? <PiXCircle />)
                break
        }
    }, [type])

    return (
        <div
            className={styles.trigger +
                ` ${styles[type]}` +
                (bullet ? ` ${styles.bullet}` : "") +
                (floating ? ` ${styles.floating}` : "") +
                (fading ? ` ${styles.fading}` : "")
            }>
            {currentIcon}
            {children}
        </div>
    )
}

export default Trigger