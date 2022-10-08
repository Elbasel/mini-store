export function findProduct(cart, product) {
  for (const cartProduct of cart) {
    if (productsAreEqual(cartProduct, product)) {
      return true;
    }
  }
  return false;
}

export function productsAreEqual(product1, product2) {
  if (product1.product.id !== product2.product.id) {
    return false;
  }

  for (const [key, value] of Object.entries(product1.selectedAttributes)) {
    if (product2.selectedAttributes[key] !== value) {
      return false;
    }
  }

  return true;
}
