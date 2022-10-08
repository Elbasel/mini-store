import React, { Component } from "react";
import styles from "./MiniCartModal.module.css";
import Button from "../../../Button";
import { Link } from "react-router-dom";

export default class MiniCartModal extends Component {
  render() {
    const { closeModal } = this.props;
    return (
      <div className={styles.MiniCartModal}>
        <div className={styles.titleContainer}>
          <h2>My Bag,</h2>
          <span>2 items</span>
        </div>

        <div className={styles.productsContainer}>products</div>
        <div className={styles.totalContainer}>
          <h2>Total</h2>
          <span>$300</span>
        </div>
        <div className={styles.buttonsContainer}>
          <Link to="/cart">
            <Button variant="regular" title="View bag" onClick={closeModal} />
          </Link>
          <Link to="/checkout">
            <Button variant="confirm" title="Checkout" onClick={closeModal} />
          </Link>
        </div>
      </div>
    );
  }
}
