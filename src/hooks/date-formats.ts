import { useCallback } from "react"

export const useDateFormats = () => {
    const combineDateAndTime = useCallback((date: Date | string, time: string) => {
        if (!date || !time) {
            return undefined
        }

        let targetDate: Date

        if (typeof date === "string" && date.includes("/")) {
            const [day, month, year] = date.split("/").map(Number)
            targetDate = new Date(Date.UTC(year, month - 1, day))
        } else {
            targetDate = new Date(date)
        }

        const year = targetDate.getUTCFullYear()
        const month = targetDate.getUTCMonth()
        const day = targetDate.getUTCDate()

        const [hours, minutes] = time.split(":").map(Number)

        return new Date(year, month, day, hours, minutes, 0)
    }, [])

    const isPastDate = useCallback((date: Date | string, referenceDate?: Date | string) => {
        const targetTime = new Date(date).getTime()
        const refTime = referenceDate ? new Date(referenceDate).getTime() : new Date().getTime()

        return targetTime < refTime
    }, [])

    const dateFormat = useCallback((date: Date | string, isForInput: boolean = false) => {
        const targetDate = new Date(date)

        const day = String(targetDate.getDate()).padStart(2, "0")
        const month = String(targetDate.getMonth() + 1).padStart(2, "0")
        const year = targetDate.getFullYear()

        if (isForInput) {
            return `${year}-${month}-${day}`
        }

        return `${day}/${month}/${year}`
    }, [])

    const timeFormat = useCallback((date: Date | string) => {
        const targetDate = new Date(date)

        const hours = String(targetDate.getHours()).padStart(2, "0")
        const minutes = String(targetDate.getMinutes()).padStart(2, "0")

        return `${hours}:${minutes}`
    }, [])

    return {
        combineDateAndTime,
        isPastDate,
        dateFormat,
        timeFormat,
    }
}