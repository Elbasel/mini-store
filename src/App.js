import React, { Component } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { CurrencyProvider } from "./lib/CurrencyContext";
import ShoppingCartProvider from "./lib/ShoppingCartContext";
import ListingPage from "./pages/ListingPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

export default class App extends Component {
  render() {
    return (
      <CurrencyProvider>
        <ShoppingCartProvider>
          <Router>
            <header>
              <Navbar />
            </header>
            <main>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => <Redirect to="/all" />}
                />
                <Route path="/product/:id" component={ProductPage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/checkout" component={() => <div>Checkout</div>} />
                <Route path="/:category" component={ListingPage} />
              </Switch>
            </main>
          </Router>
        </ShoppingCartProvider>
      </CurrencyProvider>
    );
  }
}
