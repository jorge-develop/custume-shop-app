import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  styled,
  Divider,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import {
  getGroupedProducts,
  handleAddAndSubtractItem,
} from "../utils/productListFun";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Shop({ cartItems, setCartItems }) {
  const [items, setItems] = useState(cartItems);
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    setGroupedProducts(getGroupedProducts(items));
  }, [items]);

  if (Object.keys(groupedProducts).length === 0) {
    return (
      <Box sx={{ width: "100%" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: "#ffff", flex: 1 }}
            >
              EMPTY CART
            </Typography>
            <IconButton aria-label="cart" sx={{ color: "#ffff" }}>
              <ShoppingBasketIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  const total = Object.entries(groupedProducts).reduce(
    (acc, [, groupedProduct]) => {
      const productTotal = groupedProduct.price * groupedProduct.quantity;
      return acc + productTotal;
    },
    0
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Divider>
        <IconButton aria-label="cart" color="primary">
          <ShoppingBasketIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Divider>
      <Stack spacing={2}>
        {Object.entries(groupedProducts).map(
          ([productName, groupedProduct]) => (
            <Item key={groupedProduct.id} sx={{ textAlign: "left" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  background: "#1876d18c",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                {productName}
              </Typography>
              <Typography variant="body1" mt={2}>
                Price:
                <span
                  style={{
                    color: "#1876d1",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  ${groupedProduct.price}
                </span>
              </Typography>
              <Typography variant="body1">
                Quantity:{" "}
                <span
                  style={{
                    color: "#1876d1",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {groupedProduct.quantity}
                </span>
              </Typography>
              <Box style={{ display: "flex" }}>
                <Typography variant="body1">
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      handleAddAndSubtractItem(productName, "-", setCartItems)
                    }
                  >
                    <RemoveCircleOutlineRoundedIcon sx={{ color: "red" }} />
                  </IconButton>
                </Typography>
                <Typography variant="body1">
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      handleAddAndSubtractItem(productName, "+", setCartItems)
                    }
                  >
                    <AddCircleOutlineRoundedIcon
                      sx={{ color: "green", display: "inline block" }}
                    />
                  </IconButton>
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ textAlign: "right" }}>
                Total:{" "}
                <span
                  style={{
                    color: "#1876d1",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  ${groupedProduct.price * groupedProduct.quantity}
                </span>
              </Typography>
            </Item>
          )
        )}
        <Item>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Total Cost
          </Typography>
          <Typography variant="body1">
            <b>${total}</b>
          </Typography>
        </Item>
      </Stack>
    </Box>
  );
}
