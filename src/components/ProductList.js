import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Badge,
  IconButton,
  styled,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { products } from "./data";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Shop = ({ cartItems, handleAddToCart, setCartItems }) => {
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Online Store</Typography>
          <IconButton aria-label="cart">
            <StyledBadge
              badgeContent={getTotalQuantity()}
              color="secondary"
              sx={{
                color: "white",
                "& .MuiBadge-badge": {
                  marginTop: "-15px",
                },
              }}
            >
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" style={{ marginTop: "20px" }}>
          Products
        </Typography>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          {products.map(product => {
            return (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="200"
                      image={product.img}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {product.description}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="p"
                        style={{ marginTop: "10px" }}
                      >
                        $ {product.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleAddToCart(product, setCartItems, cartItems)
                    }
                    style={{ marginBottom: "10px" }}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Shop;
