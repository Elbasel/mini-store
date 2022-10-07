import React, { Component } from "react";
import styles from "./Button.module.css";
export default class Button extends Component {
  render() {
    const { onClick, variant, title, size, disabled } = this.props;

    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${styles.button} ${styles[size]} ${styles[variant]}`}
      >
        {title}
      </button>
    );
  }
}
