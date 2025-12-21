import { useCallback } from "react"

export const useFirstName = () => {
    const firstName = useCallback((fullname: string) => {
        return fullname.split(" ")[0]
    }, [])

    return firstName
}