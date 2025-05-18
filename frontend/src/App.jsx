import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Cart from "./pages/Cart";
import OrderSummary from "./pages/Orders/OrderSummary";
import OrderStatus from "./pages/Orders/OrderStatus";
import OrderHistory from "./pages/Orders/OrderHistory";
import ProtectedRoute from "./utils/ProtectedRoute";
import { CartProvider } from "./context/CartContext";

function App() {
    return (
        <>
        <CartProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-summary" element={<OrderSummary />} />
                <Route path="/order-status" element={<OrderStatus />} />
                <Route path="/order-history" element={<OrderHistory />} />
            </Routes>
        </CartProvider>
        </>
    );
}

export default App;
