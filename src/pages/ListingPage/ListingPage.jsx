import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";

import ProductCard from "../../components/ProductCard";

import styles from "./ListingPage.module.css";

class ListingPage extends Component {
  render() {
    const { category } = this.props.data;

    if (!category) return null;

    return (
      <>
        <h1 className={styles.categoryTitle}>{category?.name}</h1>
        <div className={styles.productsContainer}>
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  }
}

const GET_PRODUCTS = gql`
  query getCategoryProducts($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
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
  }
`;

export default graphql(GET_PRODUCTS, {
  options: ({ match }) => ({
    variables: {
      title: match.params.category,
    },
  }),
})(ListingPage);
