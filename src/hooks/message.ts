import { useState } from "react"
import type { IMessageType } from "../types/message"

export const useMessage = () => {
    const [message, setMessage] = useState<string | null>(null)
    const [messageType, setMessageType] = useState<IMessageType>("success")
    const [messageIsVisible, setMessageIsVisible] = useState<boolean>(false)
    const [fading, setFading] = useState<boolean>(false)

    const addMessage = (text: string, type?: IMessageType) => {
        setMessage(text)

        if (type) {
            setMessageType(type)
        }
    }

    const showMessage = (timeout: number = 3000) => {
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
    }

    return {
        message,
        messageType,
        messageIsVisible,
        fading,
        addMessage,
        showMessage
    }
}