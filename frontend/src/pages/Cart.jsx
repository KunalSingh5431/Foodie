import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      navigate("/order-summary", { state: { cart } });
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box
      sx={{
        mt: 8,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#222",
            mb: 4,
          }}
        >
          🛒 Your Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 4, color: "#444" }}
          >
            Your cart is empty. Go grab some delicious meals!
          </Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              {cart.map((meal, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      boxShadow: 5,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 10,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={meal.strMealThumb}
                      alt={meal.strMeal}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#333" }}
                      >
                        {meal.strMeal}
                      </Typography>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        <strong>Price:</strong> ₹{meal.price}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeFromCart(meal.idMeal)}
                        fullWidth
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Summary Box */}
            <Paper
              elevation={6}
              sx={{
                mt: 6,
                p: 4,
                borderRadius: 4,
                maxWidth: 500,
                mx: "auto",
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(10px)",
                boxShadow: 6,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Total Amount: <strong>₹{total}</strong>
              </Typography>
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </Box>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
