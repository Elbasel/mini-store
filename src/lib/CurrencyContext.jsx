import { createContext } from "react";
import React, { Component } from "react";
import {
  getFromLocalStorage,
  storeInLocalStorage,
} from "../utils/localStorage";

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

  // Changes and stores the currency in localstorage
  changeGlobalCurrency = (currency) => {
    this.setState({ currency });
    storeInLocalStorage("currency", currency);
  };

  // Set the previously saved currency from localstorage on mount
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
