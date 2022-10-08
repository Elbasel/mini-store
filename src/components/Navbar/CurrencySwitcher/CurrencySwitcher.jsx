import React, { Component, createRef } from "react";
import styles from "./CurrencySwitcher.module.css";
import arrowDown from "../../../assets/arrow-down.svg";
import { CurrencyContext } from "../../../lib/CurrencyContext";

export default class CurrencySwitcher extends Component {
  static contextType = CurrencyContext;

  state = {
    modalOpen: false,
  };

  ref = createRef();
  modalRef = createRef();

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  handleOutsideClick = (e) => {
    if (!this.ref.current.contains(e.target)) {
      this.closeModal();
    }
  };

  handleClick = (currency) => {
    const { changeGlobalCurrency } = this.context;
    changeGlobalCurrency(currency);
    this.modalRef.current.classList.add(styles.slideOut);
    setTimeout(() => {
      this.closeModal();
    }, 400);
  };

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  render() {
    const { currencies } = this.props;
    const { currency } = this.context;
    return (
      <div ref={this.ref}>
        <div className={styles.symbol} onClick={this.openModal}>
          {currency.symbol}
          <img src={arrowDown} />
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
              className={styles.currencyItem}
              onClick={() => this.handleClick(currency)}
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
