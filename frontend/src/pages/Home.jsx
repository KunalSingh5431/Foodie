import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  Autocomplete,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [mealNames, setMealNames] = useState([]);
  const [user, setUser] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=").then((res) => {
      const mealsData = res.data.meals || [];
      const mealsWithPrices = mealsData.map((meal) => ({
        ...meal,
        price: Math.floor(Math.random() * (500 - 100 + 1) + 100),
      }));

      setMeals(mealsWithPrices);
      setFilteredMeals(mealsWithPrices);
      setMealNames(mealsWithPrices.map((meal) => meal.strMeal));
    });

    const storedUser = localStorage.getItem("username");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleSearch = (event, value) => {
    setSearchQuery(value);
    if (value) {
      const filteredResults = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMeals(filteredResults);
    } else {
      setFilteredMeals(meals);
    }
  };

  const handleOrderNow = (meal) => {
    addToCart(meal);
    navigate("/cart");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 6,
        px: 2,
        backgroundAttachment: "fixed",
      }}
    >
      <Container
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 3,
          padding: 4,
          boxShadow: 4,
        }}
      >
        {user && (
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333",fontFamily: 'monospace' }}>
            Welcome, {user}! 🍽️
          </Typography>
        )}

        <Autocomplete
          freeSolo
          options={mealNames}
          inputValue={searchQuery}
          onInputChange={handleSearch}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Food"
              variant="outlined"
              fullWidth
              sx={{
                mb: 4,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
                "& .MuiOutlinedInput-root": {
                  transition: "0.3s",
                  "&:hover": { boxShadow: 4 },
                  "&.Mui-focused": {
                    borderColor: "#1976d2",
                    boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.3)",
                  },
                },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Typography variant="h6" sx={{ mb: 3, color: "#555" }}>
          {searchQuery ? "Search Results:" : "Recommended Meals:"}
        </Typography>

        <Grid container spacing={4}>
          {filteredMeals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
              <Card
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                />
                <CardContent sx={{ background: "#f9f9f9" }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mb: 1 }}>
                {meal.strMeal}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                <strong>Category:</strong> {meal.strCategory}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                <strong>Area:</strong> {meal.strArea}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Price:</strong> ₹{meal.price}
                </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOrderNow(meal)}
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 2,
                    }}
                  >
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
