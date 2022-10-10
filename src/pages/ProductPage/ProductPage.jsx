import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Interweave } from "interweave";
import { graphql } from "@apollo/client/react/hoc";
import toast from "react-hot-toast";

import AttributeSet from "../../components/AttributeSet";
import Button from "../../components/Button";
import { Price } from "../../components/Price";
import { ShoppingCartContext } from "../../lib/ShoppingCartContext";
import styles from "./ProductPage.module.css";

class ProductPage extends Component {
  static contextType = ShoppingCartContext;

  state = {
    currentImage: "",
    selectedAttributes: {},
  };

  changeCurrentImage = (url) => {
    this.setState({ currentImage: url });
  };

  handleAttributeSelection = (key, value) => {
    this.setState({
      selectedAttributes: { ...this.state.selectedAttributes, [key]: value },
    });
  };

  handleAddToCart = (product, selectedAttributes) => {
    const { increaseItemQuantity } = this.context;
    toast.success("Added to cart");
    increaseItemQuantity(product, selectedAttributes);
  };

  render() {
    const { product } = this.props.data;

    if (!product) return null;

    const canAddToCart =
      !product.inStock ||
      Object.keys(this.state.selectedAttributes).length !==
        product.attributes.length;

    return (
      <div className={styles.container}>
        <div className={styles.gallery}>
          {product.gallery.map((image) => (
            <img
              key={image}
              src={image}
              onClick={() => this.changeCurrentImage(image)}
            />
          ))}
        </div>
        <div className={styles.mainImage}>
          <img src={this.state.currentImage || product.gallery[0]} />
        </div>
        <div className={styles.info}>
          <h1>{product.brand}</h1>
          <h2>{product.name}</h2>
          {product.attributes.length > 0 && (
            <div className={styles.attributes}>
              {product.attributes.map((attributeSet) => (
                <AttributeSet
                  selectionHandler={this.handleAttributeSelection}
                  key={attributeSet.id}
                  attributes={attributeSet}
                  selected={this.state.selectedAttributes[attributeSet.id]}
                />
              ))}
            </div>
          )}
          <div className={styles.priceContainer}>
            <h2>Price</h2>
            <Price prices={product.prices} className={styles.price} />
          </div>
          <Button
            title={product.inStock ? "Add to cart" : "Out of stock"}
            variant="confirm"
            size="lg"
            disabled={canAddToCart}
            onClick={() =>
              this.handleAddToCart(product, this.state.selectedAttributes)
            }
          />
          <div className={styles.description}>
            <Interweave content={product.description} />
          </div>
        </div>
      </div>
    );
  }
}

const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    product(id: $id) {
      id
      name
      gallery
      description
      inStock
      attributes {
        id
        name
        type

        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export default graphql(GET_PRODUCT, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id,
    },
  }),
})(ProductPage);
