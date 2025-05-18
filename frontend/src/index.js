import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <AuthProvider>
            <CartProvider>
                <CssBaseline />
                <App />
            </CartProvider>
        </AuthProvider>
    </BrowserRouter>
);