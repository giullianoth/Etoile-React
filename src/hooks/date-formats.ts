import type { IOrderCreate } from "../types/order"

export const useDateFormats = () => {
    const dateFormat = (date: Date | string) => {
        if (typeof date === "string") {
            date = new Date(date)
        }

        return date.toLocaleDateString()
    }

    const dateTimeFormat = (date: Date | string) => {
        if (typeof date === "string") {
            date = new Date(date)
        }

        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")

        return `${hours}:${minutes}`
    }

    const combineDateAndTime = (date: Date | null, time: IOrderCreate["time"]) => {
        if (!date) {
            return null
        }

        let timeString: string

        if (typeof time === "string") {
            timeString = time
        } else if (time instanceof Date) {
            timeString = time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
        } else {
            timeString = "00:00"
        }

        if (!timeString.match(/^\d{2}:\d{2}$/)) {
            return new Date(date)
        }

        const [hours, minutes] = timeString.split(":").map(Number)
        const newDateTime = new Date(date)

        newDateTime.setHours(hours, minutes, 0, 0)

        return newDateTime
    }

    const isPastDate = (date: Date | string) => {
        if (typeof date === "string") {
            date = new Date(date)
        }

        const currentDate = new Date()

        return date.getTime() < currentDate.getTime()
    }

    // Retorna a função para ser usada no componente
    return { dateFormat, dateTimeFormat, combineDateAndTime, isPastDate }
}