import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { CurrencyProvider } from "./lib/CurrencyContext";
import { ShoppingCartProvider } from "./lib/ShoppingCartContext";

import Navbar from "./components/Navbar";
import ListingPage from "./pages/ListingPage";
import ErrorPage from "./pages/ErrorPage";

const CartPage = React.lazy(() => import("./pages/CartPage"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));

export default class App extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return (
      <CurrencyProvider>
        <ShoppingCartProvider>
          <Router>
            <header>
              <Navbar />
            </header>
            <main>
              <Switch>
                <Suspense fallback={<div>Loading</div>}>
                  <Route
                    exact
                    path="/"
                    component={() => <Redirect to="/all" />}
                  />
                  <Route path="/product/:id" component={ProductPage} />
                  <Route path="/cart" component={CartPage} />
                  <Route
                    path="/checkout"
                    component={() => <div>Checkout</div>}
                  />
                  <Route path="/:category" component={ListingPage} />
                </Suspense>
              </Switch>
            </main>
          </Router>
        </ShoppingCartProvider>
      </CurrencyProvider>
    );
  }
}
