import { useCallback } from "react"

export const useValidateEmail = () => {
    const validate = useCallback((email: string) => {
        return /\S+@\S+\.\S+/.test(email)
    }, [])
    
    return validate
}