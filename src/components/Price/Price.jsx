import React, { Component } from "react";
import { formatCurrency, getPrice } from "../../utils/price";
import { CurrencyContext } from "../../lib/CurrencyContext";

export default class Price extends Component {
  static contextType = CurrencyContext;
  render() {
    const { prices, className } = this.props;
    const { currency } = this.context;

    if (!prices || !currency) return null;

    const amount = getPrice(prices, currency.label);

    return (
      <p className={className}>{formatCurrency(amount, currency.label)}</p>
    );
  }
}
