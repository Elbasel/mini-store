import isEqual from "lodash.isequal";

export function findProduct(cart, product) {
  return cart.find((cartProduct) => {
    if (sameProduct(cartProduct, product)) return true;
    return false;
  });
}

export function sameProduct(product1, product2) {
  const sameId = product1.product.id === product2.product.id;
  const sameAttributes = isEqual(
    product1.selectedAttributes,
    product2.selectedAttributes
  );
  return sameId && sameAttributes;
}
