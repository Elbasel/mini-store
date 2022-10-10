export function formatCurrency(number, currencyLabel) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyLabel,
  });

  return formatter.format(number);
}

export function getPrice(prices, currencyLabel) {
  return prices.find((p) => p.currency.label === currencyLabel)?.amount;
}
