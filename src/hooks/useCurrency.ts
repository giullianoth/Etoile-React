export const useCurrency = (currencyValue: string = "BRL", locales: string = "pt-BR") => {
    const currency = (value: number) => new Intl.NumberFormat(locales, {
        style: "currency",
        currency: currencyValue
    }).format(value)

    return currency
}