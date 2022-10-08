import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavList.module.css";

export default class NavList extends Component {
  render() {
    const { categories } = this.props;

    return (
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.name}>
            <NavLink
              to={`/${category.name}`}
              className={styles.link}
              activeClassName={styles.selected}
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}
