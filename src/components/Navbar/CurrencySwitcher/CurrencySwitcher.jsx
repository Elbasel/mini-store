import React, { Component, createRef } from "react";
import styles from "./CurrencySwitcher.module.css";
import arrowDown from "../../../assets/arrow-down.svg";

const currency = {
  label: "USD",
  symbol: "$",
};

const changeGlobalCurrency = () => {};

export default class CurrencySwitcher extends Component {
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

  handleClick = (curr) => {
    changeGlobalCurrency(curr);
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
          {currencies.map((curr) => (
            <li
              key={curr.label}
              className={styles.currencyItem}
              onClick={() => this.handleClick(curr)}
            >
              <span>{curr.symbol}</span>
              <span>{curr.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
