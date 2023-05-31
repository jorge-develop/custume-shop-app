import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { handleAddToCart } from "./utils/productListFun";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SimpleContainer() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cartItems from local storage on component mount
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    // Update local storage when cartItems change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, marginTop: "50px" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item>
                <ProductList
                  cartItems={cartItems}
                  handleAddToCart={handleAddToCart}
                  setCartItems={setCartItems}
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
