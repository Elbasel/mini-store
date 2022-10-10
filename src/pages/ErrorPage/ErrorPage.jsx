import React, { Component } from "react";
import Button from "../../components/Button";

import styles from "./ErrorPage.module.css";

export default class ErrorPage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>Something Went Wrong</h1>
        <Button
          title="try again"
          size="lg"
          variant="regular"
          onClick={() => window.location.reload()}
        />
      </div>
    );
  }
}
