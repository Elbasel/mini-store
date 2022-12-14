import React, { PureComponent, createRef } from "react";

import { CurrencyContext } from "../../../lib/CurrencyContext";
import arrowDown from "../../../assets/arrow-down.svg";
import styles from "./CurrencySwitcher.module.css";

export default class CurrencySwitcher extends PureComponent {
  static contextType = CurrencyContext;

  state = {
    modalOpen: false,
  };

  // To check when user clicks outside the container.
  containerRef = createRef();

  // To animate the modal closing
  modalRef = createRef();

  toggleModal = () => {
    if (this.state.modalOpen) {
      this.closeModal();
      return;
    }
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.modalRef.current.classList.add(styles.slideOut);
    setTimeout(() => {
      this.setState({ modalOpen: false });
    }, 400);
  };

  handleOutsideClick = (e) => {
    if (!this.containerRef.current.contains(e.target)) {
      this.closeModal();
    }
  };

  // Change currency value in enclosing context.
  handleCurrencyClick = (currency) => {
    const { changeGlobalCurrency } = this.context;
    changeGlobalCurrency(currency);
    this.closeModal();
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  render() {
    const { currencies, navShown } = this.props;

    if (!navShown) {
      this.closeModal();
    }

    const { currency: selectedCurrency } = this.context;

    return (
      <div ref={this.containerRef} className={styles.container}>
        <div className={styles.symbol} onClick={this.toggleModal}>
          {selectedCurrency.symbol}
          <img alt="currency switcher arrow down" src={arrowDown} />
        </div>

        <ul
          className={`${styles.currencyModal} ${
            this.state.modalOpen ? "" : `${styles.hidden}`
          }`}
          ref={this.modalRef}
        >
          {currencies.map((currency) => (
            <li
              key={currency.label}
              className={`${styles.currencyItem} ${
                currency.label === selectedCurrency.label
                  ? `${styles.selected}`
                  : ""
              }`}
              onClick={() => this.handleCurrencyClick(currency)}
            >
              <span>{currency.symbol}</span>
              <span>{currency.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
