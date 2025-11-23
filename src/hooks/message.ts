import { useState } from "react"

export const useMessage = () => {
    const [message, setMessage] = useState<string | null>(null)
    const [messageIsVisible, setMessageIsVisible] = useState<boolean>(false)
    const [fading, setFading] = useState<boolean>(false)

    const addMessage = (text: string) => setMessage(text)

    const showMessage = (timeout: number = 3000) => {
        setMessageIsVisible(true)

        setTimeout(() => {
            setFading(true)

            setTimeout(() => {
                setMessageIsVisible(false)
                setFading(false)
                setMessage(null)
            }, 300)
        }, timeout)
    }

    return {
        message,
        messageIsVisible,
        fading,
        addMessage,
        showMessage
    }
}