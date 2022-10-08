import React, { Component, createRef } from "react";

import CartIcon from "../../../assets/cart.svg";
import MiniCartModal from "./MiniCartModal/";

import styles from "./MiniCart.module.css";

export default class MiniCart extends Component {
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
    this.setState({ modalOpen: false });
  };

  handleOutsideClick = (e) => {
    if (!this.containerRef.current.contains(e.target)) {
      this.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  render() {
    return (
      <>
        <div className={styles.container} ref={this.containerRef}>
          <div onClick={this.toggleModal} className={styles.iconContainer}>
            <img src={CartIcon} />
            <span className={styles.itemCounter}>3</span>
          </div>
          <div
            ref={this.modalRef}
            className={`${styles.miniCartModal} ${
              this.state.modalOpen ? "" : `${styles.hidden}`
            }`}
          >
            <MiniCartModal closeModal={this.closeModal} />
          </div>
        </div>
        {this.state.modalOpen && <div className={styles.backdrop}></div>}
      </>
    );
  }
}
