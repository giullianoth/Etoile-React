import type { ReactNode } from "react"
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
    const defaultIcons = {
        success: <PiCheckCircleThin />,
        info: <PiInfo />,
        warning: <PiWarning />,
        error: <PiXCircle />
    }

    const renderedIcon = icon ?? defaultIcons[type]

    return (
        <div
            className={styles.trigger +
                ` ${styles[type]}` +
                (bullet ? ` ${styles.bullet}` : "") +
                (floating ? ` ${styles.floating}` : "") +
                (fading ? ` ${styles.fading}` : "")
            }>
            {renderedIcon}
            {children}
        </div>
    )
}

export default Trigger