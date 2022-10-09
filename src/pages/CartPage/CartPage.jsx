import React, { Component } from "react";
import { ShoppingCartContext } from "../../lib/ShoppingCartContext";
import CartPageProduct from "../../components/CartPageProduct";
import styles from "./CartPage.module.css";
import { Total } from "../../components/Price";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const TAX = 0.21;

export default class CartPage extends Component {
  static contextType = ShoppingCartContext;

  render() {
    const { cart, getCartQuantity } = this.context;
    return (
      <div className={styles.container}>
        <h1>Cart</h1>
        <div className={styles.products}>
          {cart.map((cartProduct, i) => (
            <CartPageProduct key={i} cartProduct={cartProduct} />
          ))}
        </div>
        <table className="pricing">
          <tbody>
            <tr>
              <td>Tax 21%: </td>
              <td>
                <Total onlyTax tax={TAX} cart={cart} />
              </td>
            </tr>
            <tr>
              <td>Quantity: </td>
              <td>{getCartQuantity()}</td>
            </tr>
            <tr>
              <td>Total: </td>
              <td>
                <Total tax={TAX} cart={cart} />
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/checkout">
          <Button size="lg" variant="confirm" title="order" />
        </Link>
      </div>
    );
  }
}
