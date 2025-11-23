import { useEffect, useState, type ReactNode } from "react"
import type { IMessageType } from "../../types/message"
import styles from "./Trigger.module.css"
import { PiCheckCircleThin, PiInfo, PiWarning, PiXCircle } from "react-icons/pi"

type Props = {
    message: string
    type: IMessageType
    small?: boolean
    icon?: ReactNode
}

const Trigger = ({ message, type, small, icon }: Props) => {
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
                (small ? ` ${styles.small}` : "")
            }>
            {currentIcon}
            {message}
        </div>
    )
}

export default Trigger