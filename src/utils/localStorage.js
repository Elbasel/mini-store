export function storeInLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(
      `error setting "${key}" to "${value}" in localstorage: `,
      error
    );
  }
}

export function getFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log(`error getting "${key}" from localstorage: `, error);
  }
}
