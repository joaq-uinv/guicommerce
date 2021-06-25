import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Products, Cart } from "./components";
import { commerce } from "./lib/commerce";

const App = () => {
  //set the initial state for the products to an empty array
  const [products, setProducts] = useState([]);
  //set the initial state for the cart to an empty object
  const [cart, setCart] = useState({});
  //state to store the index of a product and toggle its visibility later
  const [selected, setSelected] = useState(null);

  const fetchProducts = async () => {
    //fetch and destructure the items from commerce
    const { data } = await commerce.products.list();
    //fill the products state with the items fetched
    setProducts(data);
  };

  const fetchCart = async () => {
    //fetch the data from the cart in commerce and populate the cart state with them
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    //persist an item with to commerce
    const item = await commerce.cart.add(productId, quantity);
    //push the persisted item to the cart state
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    //update and existing item in the cart in commerce
    const response = await commerce.cart.update(lineItemId, { quantity });
    //push the updated item to the cart state
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    //remove an existing item from commerce
    const response = await commerce.cart.remove(lineItemId);
    //set the cart state object to the "updated" cart
    setCart(response.cart);
  };

  //!TENGO QUE IMPLEMENTARLO
  //toggle visbility of a product
  const selectProduct = (id) => {
    const selectedID = products.findIndex((product) => product.id === id);
    setSelected(selectedID); //store the index of the selected product in the state
    // const selectedProduct = selected[selectedID];
  };

  //show the products and the cart the first time the component mounts
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <CssBaseline />
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products
              products={products}
              onAddToCart={handleAddToCart}
              handleUpdateCartQty
            />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
