import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";

import styles from "./Navbar.module.css";

import Icon from "../../assets/hero-icon.svg";
import NavList from "./NavList";
import CurrencySwitcher from "./CurrencySwitcher";

class Navbar extends Component {
  render() {
    const { categories, currencies } = this.props.data;

    if (!categories || !currencies) return null;

    return (
      <nav className={styles.navbar}>
        <NavList categories={categories} />
        <img className={styles.icon} src={Icon} />
        <div>
          <CurrencySwitcher currencies={currencies} />
        </div>
      </nav>
    );
  }
}

const GET_CATEGORY_NAMES = gql`
  query {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

export default graphql(GET_CATEGORY_NAMES)(Navbar);
