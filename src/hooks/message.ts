import { useCallback, useState } from "react"
import type { IMessageContext, IMessageType } from "../types/message"

export const useMessage = (): IMessageContext => {
    const [message, setMessage] = useState<string | null>(null)
    const [messageType, setMessageType] = useState<IMessageType>("success")
    const [messageIsVisible, setMessageIsVisible] = useState<boolean>(false)
    const [fading, setFading] = useState<boolean>(false)

    const addMessage = useCallback((text: string, type: IMessageType = "success") => {
        setMessage(text)
        setMessageType(type)
    }, [])

    const showMessage = useCallback((timeout: number = 3000) => {
        setMessageIsVisible(true)

        setTimeout(() => {
            setFading(true)

            setTimeout(() => {
                setMessageIsVisible(false)
                setFading(false)
                setMessage(null)
                setMessageType("success")
            }, 300)
        }, timeout)
    }, [])

    return {
        message,
        messageType,
        messageIsVisible,
        fading,
        addMessage,
        showMessage
    }
}