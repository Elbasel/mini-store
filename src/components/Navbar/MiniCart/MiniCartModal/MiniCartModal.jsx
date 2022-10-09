import React, { Component } from "react";
import styles from "./MiniCartModal.module.css";
import Button from "../../../Button";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../../../lib/ShoppingCartContext";
import MiniCartProduct from "../MiniCartProduct";
import { Total } from "../../../Price";

export default class MiniCartModal extends Component {
  static contextType = ShoppingCartContext;

  render() {
    const { closeModal } = this.props;
    const { cart, getCartQuantity } = this.context;
    return (
      <div className={styles.MiniCartModal}>
        <div className={styles.titleContainer}>
          <h2>My Bag,</h2>
          <span>{getCartQuantity()} items</span>
        </div>

        <div className={styles.productsContainer}>
          {cart.map((cartProduct) => (
            <MiniCartProduct
              key={cartProduct.product.id}
              cartProduct={cartProduct}
            />
          ))}
        </div>
        <div className={styles.totalContainer}>
          <h2>Total</h2>
          <span>
            <Total cart={cart} />
          </span>
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
