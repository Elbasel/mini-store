import React, { Component, createContext } from "react";
import { findProduct, sameProduct } from "../utils/product";

import {
  getFromLocalStorage,
  storeInLocalStorage,
} from "../utils/localStorage";

export const ShoppingCartContext = createContext();

export class ShoppingCartProvider extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const storedCart = getFromLocalStorage("cart");
    if (storedCart != null) {
      this.setState({ cart: storedCart });
    }
  }

  componentDidUpdate() {
    storeInLocalStorage("cart", this.state.cart);
  }

  // Get normalized product object with either default or selected attributes.
  normalizeProduct = (product, selectedAttributes) => {
    const normalizedProduct = { product, selectedAttributes: {} };
    for (const attributeSet of product.attributes) {
      const { id, items } = attributeSet;
      normalizedProduct.selectedAttributes[id] =
        selectedAttributes?.[id] || items[0]?.value;
    }
    return normalizedProduct;
  };

  increaseItemQuantity = (product, selectedAttributes) => {
    // normalize product object to match objects in cart
    const normalizedProduct = this.normalizeProduct(
      product,
      selectedAttributes
    );

    this.setState((prevState) => {
      // If product not already in cart; add it to cart.
      if (findProduct(prevState.cart, normalizedProduct) == null) {
        return {
          cart: [...prevState.cart, { ...normalizedProduct, quantity: 1 }],
        };
      } else {
        // Else increase its quantity by 1.
        return {
          cart: prevState.cart.map((cartProduct) => {
            if (sameProduct(cartProduct, normalizedProduct)) {
              return { ...cartProduct, quantity: cartProduct.quantity + 1 };
            }
            return cartProduct;
          }),
        };
      }
    });
  };

  decreaseItemQuantity = (product, selectedAttributes) => {
    // normalize product object to match objects in cart
    const normalizedProduct = this.normalizeProduct(
      product,
      selectedAttributes
    );

    this.setState((prevState) => {
      // If product's quantity is equal to 1; remove it from cart.
      if (findProduct(prevState.cart, normalizedProduct)?.quantity === 1) {
        return {
          cart: prevState.cart.filter(
            (cartProduct) => !sameProduct(cartProduct, normalizedProduct)
          ),
        };
      } else {
        // Else reduce its quantity by 1.
        return {
          cart: prevState.cart.map((cartProduct) => {
            if (sameProduct(cartProduct, normalizedProduct)) {
              return { ...cartProduct, quantity: cartProduct.quantity - 1 };
            }
            return cartProduct;
          }),
        };
      }
    });
  };

  getCartQuantity = () => {
    return this.state.cart.reduce((totalQuantity, cartProduct) => {
      return totalQuantity + cartProduct.quantity;
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
