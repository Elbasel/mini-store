export function formatCurrency(number, currency) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });

  return formatter.format(number);
}

export function getPrice(prices, currencyLabel) {
  for (const p of prices) {
    if (p.currency.label === currencyLabel) {
      return p.amount;
    }
  }
}
