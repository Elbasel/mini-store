import React, { Component, createContext } from "react";
import { findProduct, productsAreEqual } from "../utils/product";
import { formatCurrency, getPrice } from "../utils/price";
import { CurrencyContext } from "./CurrencyContext";
import {
  getFromLocalStorage,
  storeInLocalStorage,
} from "../utils/localStorage";

export const ShoppingCartContext = createContext();

export default class ShoppingCartProvider extends Component {
  state = {
    cart: [],
  };

  setCart = (newState) => {
    storeInLocalStorage("cart", newState);
    this.setState({ cart: newState });
  };

  componentDidMount() {
    const storedCart = getFromLocalStorage("cart");
    if (storedCart != null) {
      this.setCart(storedCart);
    }
  }

  normalizeProduct = (product, selectedAttributes) => {
    // Get new product object with either default or selected attributes.
    const newCartProduct = { product, selectedAttributes: {} };
    for (const attributeSet of product.attributes) {
      const { id, items } = attributeSet;
      newCartProduct.selectedAttributes[id] =
        selectedAttributes?.[id] || items[0].value;
    }
    return newCartProduct;
  };

  increaseItemQuantity = (product, selectedAttributes) => {
    // Initialize new product object with either default or selected attributes
    const newCartProduct = this.normalizeProduct(product, selectedAttributes);

    // If the product is already in the cart, increase its quantity
    if (findProduct(this.state.cart, newCartProduct)) {
      this.setCart(
        this.state.cart.map((item) => {
          if (productsAreEqual(item, newCartProduct)) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        })
      );
      return;
    }

    // If the product is not the cart, add it with a quantity of 1.
    this.setCart([...this.state.cart, { ...newCartProduct, quantity: 1 }]);
  };

  decreaseItemQuantity = (product, selectedAttributes) => {
    // match product shape already in cart
    const newCartProduct = this.normalizeProduct(product, selectedAttributes);

    for (const product of this.state.cart) {
      if (productsAreEqual(product, newCartProduct)) {
        // if product quantity is equal to 1, remove it from cart

        if (product.quantity === 1) {
          this.setCart(
            this.state.cart.filter((item) => !productsAreEqual(item, product))
          );
        } else {
          // else decrease it its quantity by 1

          this.setCart(
            this.state.cart.map((item) => {
              if (productsAreEqual(item, newCartProduct)) {
                return { ...item, quantity: item.quantity - 1 };
              } else {
                return item;
              }
            })
          );
        }
      }
    }
  };

  getCartQuantity = () => {
    return this.state.cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  render() {
    const { children } = this.props;

    const { cart } = this.state;

    const { getCartQuantity, increaseItemQuantity, decreaseItemQuantity } =
      this;

    const value = {
      cart,
      getCartQuantity,
      increaseItemQuantity,
      decreaseItemQuantity,
    };
    return (
      <ShoppingCartContext.Provider value={value}>
        {children}
      </ShoppingCartContext.Provider>
    );
  }
}
