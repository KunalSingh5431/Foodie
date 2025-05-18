import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    InputAdornment,
    IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import loginBg from "../../assets/login-bg.jpg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.user.name);

            alert("Login Successful!");
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed! Please check your credentials.");
        }
    };

    return (
        <Box
            sx={{
                mt: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundImage: `url(${loginBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                px: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    maxWidth: 400,
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.92)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
                }}
            >
                <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                    Welcome Back
                </Typography>
                <Typography variant="subtitle2" align="center" color="text.secondary" mb={2}>
                    Please login to your account
                </Typography>
                {error && <Typography color="error" align="center" mb={2}>{error}</Typography>}
                
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3, py: 1.2, borderRadius: "8px", fontWeight: "bold" }}
                    onClick={handleLogin}
                >
                    Login
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Don't have an account?{" "}
                    <Link to="/signup" underline="hover">
                        Signup
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
