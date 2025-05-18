import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress, Paper, Fade } from "@mui/material";
import { useLocation } from "react-router-dom";
import Food from "../../assets/deli.png";

const OrderStatus = () => {
    const [statusIndex, setStatusIndex] = useState(0);
    const location = useLocation();
    const paymentMethod = location.state?.paymentMethod || "Unknown";

    const statusSteps = ["Preparing", "Out for Delivery", "Delivered"];

    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev < statusSteps.length - 1 ? prev + 1 : prev));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getProgressColor = () => {
        switch (statusIndex) {
            case 0:
                return "info";
            case 1:
                return "warning";
            case 2:
                return "success";
            default:
                return "primary";
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100vw",
                height: "100vh",
                background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
                px: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    maxWidth: 900,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    p: 5,
                    borderRadius: 5,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                }}
            >
                <Box sx={{ flex: 1, minWidth: 280 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            mb: 2,
                            color: "#2e3c58",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                        }}
                    >
                        🚚 Order Status
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        <strong>Payment Method:</strong> {paymentMethod}
                    </Typography>
                    <Fade in>
                        <Typography
                            variant="h5"
                            sx={{ mt: 2, fontWeight: 600, color: "#444" }}
                        >
                            🕓 {statusSteps[statusIndex]}
                        </Typography>
                    </Fade>
                    <LinearProgress
                        variant="determinate"
                        value={(statusIndex + 1) * 33}
                        color={getProgressColor()}
                        sx={{
                            mt: 3,
                            height: 12,
                            borderRadius: 6,
                            width: "90%",
                            backgroundColor: "rgba(0,0,0,0.1)",
                        }}
                    />
                    <Typography variant="caption" sx={{ mt: 1, display: "block", color: "#777" }}>
                        Step {statusIndex + 1} of 3
                    </Typography>
                </Box>

                <Box
                    component="img"
                    src={Food}
                    alt="Food Delivery"
                    sx={{
                        width: 260,
                        height: 260,
                        objectFit: "cover",
                        borderRadius: "50%",
                        boxShadow: 5,
                        mt: { xs: 4, md: 0 },
                    }}
                />
            </Paper>
        </Box>
    );
};

export default OrderStatus;
