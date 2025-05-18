import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AppBar position="fixed" color="primary" elevation={4}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h5"
                    component={Link}
                    to="/"
                    sx={{
                        textDecoration: 'none',
                        color: 'white',
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        fontFamily: 'monospace'
                    }}
                >
                    Foodie
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/menu"
                        sx={{
                            textTransform: 'none',
                            fontWeight: '500',
                            '&:hover': {
                                backgroundColor: '#ffffff22'
                            }
                        }}
                    >
                        Menu
                    </Button>

                    {token && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate("/order-history")}
                            sx={{
                                textTransform: 'none',
                                fontWeight: '500',
                                borderRadius: '20px',
                                px: 2
                            }}
                        >
                            View Order History
                        </Button>
                    )}

                    {token ? (
                        <>
                            <Button
                                onClick={handleLogout}
                                variant="outlined"
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#ffffff22'
                                    }
                                }}
                            >
                                Logout
                            </Button>
                            <IconButton color="inherit" component={Link} to="/cart">
                                <Badge>
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Button
                                component={Link}
                                to="/login"
                                variant="outlined"
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#ffffff22'
                                    }
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                component={Link}
                                to="/signup"
                                variant="outlined"
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#ffffff22'
                                    }
                                }}
                            >
                                Signup
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
