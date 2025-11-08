import { useState } from "react"

export const useShowTrigger = (timeout: number = 3000) => {
    const [triggerIsVisible, setTriggerIsVisible] = useState<boolean>(false)
    const [triggerIsFading, setTriggerIsFading] = useState<boolean>(false)
    const [triggerMessage, setTriggerMessage] = useState<string | null>(null)

    const addTriggerMessage = (message: string | null) => setTriggerMessage(message)

    const showTrigger = () => {
        setTriggerIsVisible(true)

        setTimeout(() => {
            setTriggerIsFading(true)

            setTimeout(() => {
                setTriggerIsVisible(false)
                setTriggerIsFading(false)
                setTriggerMessage(null)
            }, 300)
        }, timeout)
    }

    return { triggerIsVisible, triggerIsFading, triggerMessage, addTriggerMessage, showTrigger }
}