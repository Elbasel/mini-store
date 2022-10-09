import React, { Component } from "react";
import { ShoppingCartContext } from "../../../../lib/ShoppingCartContext";
import styles from "./MiniCartProduct.module.css";
import AttributeSet from "../../../AttributeSet";
import { Price } from "../../../Price";

export default class MiniCartProduct extends Component {
  static contextType = ShoppingCartContext;

  render() {
    const { cartProduct } = this.props;
    const { product, quantity, selectedAttributes } = cartProduct;

    const { increaseItemQuantity, decreaseItemQuantity } = this.context;
    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>
            <span>{product.brand}</span>
            <span>{product.name}</span>
          </h2>
          <Price prices={product.prices} className={styles.price} />
          <div className={styles.attributes}>
            {product.attributes.map((attributeSet) => (
              <AttributeSet
                key={attributeSet.id}
                selected={selectedAttributes[attributeSet.id]}
                size="sm"
                attributes={attributeSet}
              />
            ))}
          </div>
        </div>
        <div className={styles.buttons}>
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
        <div className={styles.imageContainer}>
          <img className={styles.image} src={product.gallery[0]} />
        </div>
      </div>
    );
  }
}
