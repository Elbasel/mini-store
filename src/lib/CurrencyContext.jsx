import { createContext } from "react";
import React, { Component } from "react";
import {
  getFromLocalStorage,
  storeInLocalStorage,
} from "../utils/LocalStrorage";

export const CurrencyContext = createContext({
  currency: { label: null, symbol: null },
});

export class CurrencyProvider extends Component {
  state = {
    currency: {
      label: "USD",
      symbol: "$",
    },
  };

  changeGlobalCurrency = (currency) => {
    this.setState({ currency });
    storeInLocalStorage("currency", currency);
  };

  // Set the previously saved currency from localstorage
  componentDidMount() {
    const storedCurrency = getFromLocalStorage("currency");
    if (storedCurrency != null) {
      this.changeGlobalCurrency(storedCurrency);
    }
  }

  render() {
    const { children } = this.props;
    const { currency } = this.state;
    const { changeGlobalCurrency } = this;

    const value = {
      currency,
      changeGlobalCurrency,
    };

    return (
      <CurrencyContext.Provider value={value}>
        {children}
      </CurrencyContext.Provider>
    );
  }
}
