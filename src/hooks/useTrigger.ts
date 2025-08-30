import { useState } from "react"

export const useTrigger = (milliSeconds?: number) => {
    const [triggerIsVisible, setTriggerIsVisible] = useState<boolean>(false)

    const showTrigger = () => {
        setTriggerIsVisible(true)
        setTimeout(() => {
            setTriggerIsVisible(false)
        }, (milliSeconds ?? 3000))
    }

    return { triggerIsVisible, showTrigger }
}