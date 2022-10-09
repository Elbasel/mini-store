import React, { Component } from "react";
import { formatCurrency, getPrice } from "../../utils/price";
import { CurrencyContext } from "../../lib/CurrencyContext";

export class Price extends Component {
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

export class Total extends Component {
  static contextType = CurrencyContext;

  render() {
    const { cart, className } = this.props;
    const { currency } = this.context;

    if (!cart || !currency) return null;
    const total = cart.reduce((total, item) => {
      return (
        total + getPrice(item.product.prices, currency.label) * item.quantity
      );
    }, 0);

    const formatted = formatCurrency(total, currency.label);

    return <p className={className}>{formatted}</p>;
  }
}
