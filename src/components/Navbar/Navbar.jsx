import React, { Component, PureComponent } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";

import Icon from "../../assets/hero-icon.svg";
import NavList from "./NavList";
import CurrencySwitcher from "./CurrencySwitcher";
import MiniCart from "./MiniCart";
import styles from "./Navbar.module.css";

class Navbar extends PureComponent {
  state = {
    previousScrollYPosition: 0,
    visible: true,
  };

  onScroll = () => {
    const currentScrollYPosition = window.scrollY;

    const isScrollingUp =
      currentScrollYPosition < this.state.previousScrollYPosition;

    if (isScrollingUp) {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: false });
    }

    this.setState({ previousScrollYPosition: window.scrollY });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  render() {
    const { categories, currencies, error } = this.props.data;

    if (!categories || !currencies) return null;

    return (
      <nav
        className={`${styles.navbar} ${
          this.state.visible ? styles.shown : styles.hidden
        }`}
      >
        <NavList categories={categories} />
        <img alt="logo" className={styles.icon} src={Icon} />
        <div className={styles.controlsContainers}>
          <CurrencySwitcher
            navShown={this.state.visible}
            currencies={currencies}
          />
          <MiniCart navShown={this.state.visible} />
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
