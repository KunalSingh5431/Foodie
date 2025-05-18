import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleConfirmOrder = () => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      totalAmount,
      paymentMethod,
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    localStorage.setItem("orderHistory", JSON.stringify([...existingOrders, newOrder]));

    clearCart();
    navigate("/order-status", { state: { paymentMethod, cart } });
  };

  return (
    <Box
      sx={{
        mt: 8,
        px: 2,
        py: 5,
        minHeight: "100vh",
        backgroundImage: `linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 5,
            fontWeight: "bold",
            color: "#333",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          📦 Order Summary
        </Typography>

        <Grid container spacing={4}>
          {cart.map((meal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 6,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 12,
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
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {meal.strMeal}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Price: ₹{meal.price || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={6}
          sx={{
            mt: 6,
            p: 4,
            borderRadius: 4,
            maxWidth: 500,
            mx: "auto",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(6px)",
            boxShadow: 10,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            💰 Total: ₹{totalAmount.toFixed(2)}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Select Payment Method:
          </Typography>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              value="COD"
              control={<Radio color="primary" />}
              label="Cash on Delivery (COD)"
            />
            <FormControlLabel
              value="Online"
              control={<Radio color="primary" />}
              label="Online Payment"
            />
          </RadioGroup>

          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleConfirmOrder}
            sx={{
              mt: 4,
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "30px",
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#43a047",
                boxShadow: 8,
                transform: "scale(1.05)",
              },
            }}
          >
            ✅ Confirm Order
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default OrderSummary;
