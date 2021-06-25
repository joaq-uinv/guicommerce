import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();

  //!HAY QUE IMPLEMENTARLO
  //cart.line_items.line_total
  const sortCartItemsAsc = (prices) => {
    //make an array with the values of the prices
    const pricesArr = Object.values(prices);
    //sort array in ascending order
    return pricesArr.sort((a, b) => a - b);
  };

  const sortCartItemsDesc = (prices) => {
    //make an array with the values of the prices
    const pricesArr = Object.values(prices);
    //sort array in ascending order
    return pricesArr.sort((a, b) => b - a);
  };

  //show message with link to home is no item is selected
  const showEmptyCart = () => (
    <Typography variant="subtitle1" style={{ textAlign: "center" }}>
      No elegiste ningún producto, ¡
      <Link className={classes.link} to="/">
        volvé para poder agregar alguno
      </Link>
      !
    </Typography>
  );

  //show this component if at least one item was selected
  const showCart = () => (
    <>
      <Grid container justify="center" spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem
              item={lineItem}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Vaciar carrito
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Comprar
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Carrito
      </Typography>
      {/* if cart.line_items.lenght does not exist i.e is a falsy value, run one function, otherwise, run the other one   */}
      {!cart.line_items.length ? showEmptyCart() : showCart()}
    </Container>
  );
};

export default Cart;
