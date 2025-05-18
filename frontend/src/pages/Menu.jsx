import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const meals = res.data.meals || [];

        const mealsWithPrices = meals.map((meal) => ({
          ...meal,
          price: Math.floor(Math.random() * (500 - 100 + 1) + 100), // ₹100 - ₹500
        }));

        setFoodItems(mealsWithPrices);
      } catch (error) {
        console.error("Error fetching food data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItems();
  }, []);

  return (
    <Container sx={{ mt: 12, mb: 6 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold",fontFamily: 'monospace' }}>
        Our Delicious Menu 🍽️
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
      ) : (
        <Grid container spacing={4}>
          {foodItems.map((food) => (
            <Grid item xs={12} sm={6} md={4} key={food.idMeal}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={food.strMealThumb}
                  alt={food.strMeal}
                />
                <CardContent sx={{ backgroundColor: "#fdfdfd" }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {food.strMeal}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    <strong>Category:</strong> {food.strCategory}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    <strong>Area:</strong> {food.strArea}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Price:</strong> ₹{food.price}
                  </Typography>

                  {/* Optional: Sample description */}
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                    A delightful taste from {food.strArea} cuisine.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Menu;
