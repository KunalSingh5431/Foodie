import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box,
    Divider,
} from "@mui/material";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
        setOrders(storedOrders);
    }, []);

    return (
        <Box
            sx={{
                mt:8,
                minHeight: "100vh",
                background: "linear-gradient(to right, #fce4ec, #e3f2fd)",
                py: 6,
            }}
        >
            <Container>
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        mb: 5,
                        fontWeight: "bold",
                        color: "#2e3c58",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                >
                    📜 Order History
                </Typography>

                {orders.length === 0 ? (
                    <Typography variant="h6" align="center" color="textSecondary">
                        No orders found.
                    </Typography>
                ) : (
                    orders.map((order) => (
                        <Card
                            key={order.id}
                            sx={{
                                mb: 4,
                                p: 3,
                                borderRadius: 4,
                                boxShadow: 6,
                                backgroundColor: "#fff",
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                <strong>Order Date:</strong> {order.date}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Payment Method:</strong> {order.paymentMethod}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ mt: 1, color: "#4caf50", fontWeight: "bold" }}
                            >
                                Total: ₹{order.totalAmount.toFixed(2)}
                            </Typography>

                            <Divider sx={{ my: 3 }} />

                            <Grid container spacing={3}>
                                {order.items.map((meal, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            sx={{
                                                height: "100%",
                                                transition: "transform 0.3s ease",
                                                "&:hover": {
                                                    transform: "scale(1.03)",
                                                },
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                image={meal.strMealThumb}
                                                alt={meal.strMeal}
                                                sx={{
                                                    objectFit: "cover",
                                                    borderTopLeftRadius: 8,
                                                    borderTopRightRadius: 8,
                                                }}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    {meal.strMeal}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Price: ₹{meal.price || 0}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Card>
                    ))
                )}
            </Container>
        </Box>
    );
};

export default OrderHistory;
