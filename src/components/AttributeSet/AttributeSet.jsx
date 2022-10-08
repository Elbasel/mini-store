import React, { Component } from "react";
import styles from "./AttributeSet.module.css";

export default class AttributeSet extends Component {
  render() {
    const { attributes, selected, selectionHandler } = this.props;
    if (!attributes) return null;

    return (
      <div>
        <h3 className={styles.setTitle}>{attributes.name}</h3>

        {attributes.type === "text" && (
          <div>
            <div className={styles.textSet}>
              {attributes.items.map((item) => (
                <div
                  className={`${styles.textItem} ${
                    selected === item.value ? `${styles.selected}` : ""
                  }`}
                  key={item.id}
                  onClick={() => selectionHandler(attributes.id, item.value)}
                >
                  {item.displayValue}
                </div>
              ))}
            </div>
          </div>
        )}

        {attributes.type === "swatch" && (
          <div>
            <div className={styles.swatchSet}>
              {attributes.items.map((item) => (
                <div
                  className={`${styles.swatchItemWrapper} ${
                    selected === item.value ? `${styles.selected}` : ""
                  }`}
                  key={item.id}
                  onClick={() => selectionHandler(attributes.id, item.value)}
                >
                  <div
                    style={{
                      background:
                        item.value === "#FFFFFF" ? "#0000002d" : item.value,
                    }}
                    className={styles.swatchItem}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
