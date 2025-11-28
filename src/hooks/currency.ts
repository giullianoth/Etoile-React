export const useCurrency = (currency: string = "BRL", locales: string = "pt-br") => {
    const converted = (value: number | string) => {
        if (typeof value === "string") {
            value = Number(value)
        }

        return new Intl.NumberFormat(locales, {
            style: "currency",
            currency
        }).format(value)
    }

    return converted
}