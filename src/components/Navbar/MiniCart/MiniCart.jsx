import React, { PureComponent, createRef } from "react";

import CartIcon from "../../../assets/cart.svg";
import MiniCartModal from "./MiniCartModal/";
import { ShoppingCartContext } from "../../../lib/ShoppingCartContext";
import styles from "./MiniCart.module.css";

export default class MiniCart extends PureComponent {
  static contextType = ShoppingCartContext;

  state = {
    modalOpen: false,
  };

  // To check when user clicks outside the container.
  containerRef = createRef();

  toggleModal = () => {
    this.setState((prevState) => ({ modalOpen: !prevState.modalOpen }));
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  handleOutsideClick = (e) => {
    if (!this.containerRef.current.contains(e.target)) {
      // if user clicks on product card button that is no longer part of this element
      if (e.target.tagName === "BUTTON" && e.target.textContent === "-") return;
      this.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  render() {
    const { getCartQuantity } = this.context;
    const { navShown } = this.props;

    if (!navShown) {
      this.closeModal();
    }

    return (
      <>
        <div className={styles.container} ref={this.containerRef}>
          <div onClick={this.toggleModal} className={styles.iconContainer}>
            <img alt="cart icon" src={CartIcon} />
            {getCartQuantity() > 0 && (
              <span className={styles.itemCounter}>{getCartQuantity()}</span>
            )}
          </div>
          {this.state.modalOpen && (
            <div
              className={`${styles.miniCartModal} 
              }`}
            >
              <MiniCartModal closeModal={this.closeModal} />
            </div>
          )}
        </div>
        {this.state.modalOpen && <div className={styles.backdrop}></div>}
      </>
    );
  }
}
