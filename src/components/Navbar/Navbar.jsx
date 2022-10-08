import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";

import styles from "./Navbar.module.css";

import Icon from "../../assets/hero-icon.svg";
import NavList from "./NavList";
import CurrencySwitcher from "./CurrencySwitcher";
import MiniCart from "./MiniCart";

class Navbar extends Component {
  render() {
    const { categories, currencies, error } = this.props.data;

    if (!categories || !currencies)
      return (
        <div
          className="skeleton skeleton-line"
          style={{ "--l-h": "80px", "--c-w": "100%" }}
        ></div>
      );

    return (
      <nav className={styles.navbar}>
        <NavList categories={categories} />
        <img className={styles.icon} src={Icon} />
        <div className={styles.controlsContainers}>
          <CurrencySwitcher currencies={currencies} />
          <MiniCart />
        </div>
      </nav>
    );
  }
}

// Getting the categories for the navbar <NavLink />
// Getting the currencies for the <CurrencySwitcher />
const NAVBAR_QUERY = gql`
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

export default graphql(NAVBAR_QUERY)(Navbar);
