export const useCurrency = (currencyType: string = "BRL", locales: string = "pt-BR") => {
    
    const currency = (value: number | string) => {
        if (typeof value === "string") {
            value = parseFloat(value)
        }

        return new Intl.NumberFormat(locales, {
            style: "currency",
            currency: currencyType
        }).format(value)
    }

    return currency
}