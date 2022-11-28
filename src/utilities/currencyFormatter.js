const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD'})

export function currencyFormatter(number) {
    return CURRENCY_FORMATTER.format(number/100)
}