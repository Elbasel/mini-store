import React, { Component } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { ShoppingCartContext } from "../../lib/ShoppingCartContext";
import { Price } from "../../components/Price";
import CarIcon from "../../assets/cart-white.svg";
import styles from "./ProductCard.module.css";

export default class ProductCard extends Component {
  static contextType = ShoppingCartContext;

  handleAddToCart = (product) => {
    const { increaseItemQuantity } = this.context;
    increaseItemQuantity(product);
    toast.success("Added to cart");
  };

  render() {
    const { product } = this.props;
    return (
      <article className={styles.container}>
        <Link to={`/product/${product.id}`} className={styles.card}>
          <div className={styles.imageContainer}>
            {!product.inStock && (
              <div className={styles.shade}>Out Of Stock</div>
            )}
            <img
              alt={product.name}
              className={styles.productImage}
              src={product.gallery[0]}
            />
          </div>

          <h2>{product.name}</h2>
          <Price prices={product.prices} className={styles.price} />
        </Link>
        {product.inStock && (
          <div
            className={styles.addToCart}
            onClick={() => this.handleAddToCart(product)}
          >
            <img alt="add to cart button" src={CarIcon}></img>
          </div>
        )}
      </article>
    );
  }
}
