import React, { Component } from "react";
import styles from "./CartPageProduct.module.css";
import { Price } from "../../components/Price";
import AttributeSet from "../AttributeSet";
import { ShoppingCartContext } from "../../lib/ShoppingCartContext";

export default class CartPageProduct extends Component {
  static contextType = ShoppingCartContext;

  render() {
    const { cartProduct } = this.props;
    const { product, quantity, selectedAttributes } = cartProduct;
    const { increaseItemQuantity, decreaseItemQuantity } = this.context;
    return (
      <div className={styles.container}>
        <div>
          <h2>
            <span>{product.brand}</span>
            <span>{product.name}</span>
          </h2>
          <Price className={styles.price} prices={product.prices} />
          <div className={styles.attributes}>
            {product.attributes.map((attributeSet) => (
              <AttributeSet
                key={attributeSet.id}
                selected={selectedAttributes[attributeSet.id]}
                attributes={attributeSet}
              />
            ))}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.buttonsContainer}>
            <button
              onClick={() => increaseItemQuantity(product, selectedAttributes)}
            >
              +
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => decreaseItemQuantity(product, selectedAttributes)}
            >
              -
            </button>
          </div>
          <img src={product.gallery[0]} />
        </div>
      </div>
    );
  }
}
