import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Typography,
  Grid,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faSun, faCloudSun, faCloudRain } from "@fortawesome/free-solid-svg-icons";
import wineIcon from "./icon/wine-bottle.png";
import sojuIcon from "./icon/soju.png";
import beerIcon from "./icon/beer.png";
import makgeolliIcon from "./icon/rice-wine.png";
import { useHistory } from 'react-router-dom';
import RecipeReviewCard from "../components/RecipeReviewCard"; 

const theme = createTheme({
  palette: {
    primary: {
      main: "#6f48eb", // 보라색
    },
  },
});

const DrinkRecommendation = () => {
  const [weather, setWeather] = useState(null);
  const [recommendationType, setRecommendationType] = useState("drink");
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [foodRecommendation, setFoodRecommendation] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Daejeon,kr&appid=af984965d76ffbb83dbfda6c8e3faae3&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  const drinkOptions = [
    { name: "Wine", icon: wineIcon },
    { name: "Soju", icon: sojuIcon },
    { name: "Beer", icon: beerIcon },
    { name: "Makgeolli", icon: makgeolliIcon },
  ];

  const handleDrinkSelection = (drink) => {
    setSelectedDrink(drink);
    setFoodRecommendation(null);
  };

  const drinkIconStyle = {
    width: "50px",
    height: "50px",
    cursor: "pointer",
  };

  const selectedDrinkStyle = {
    border: "2px solid blue",
  };

  const getWeatherIcon = (weather) => {
    const lowerCaseWeather = (weather?.toLowerCase() ?? "");
    
    if (lowerCaseWeather.includes("clear")) {
      return faSun;
    } else if (lowerCaseWeather.includes("clouds")) {
      return faCloud;
    } else if (lowerCaseWeather.includes("rain")) {
      return faCloudRain;
    } else {
      return faCloudSun;
    }
  };
  

  const getDrinkRecommendationByWeather = () => {
    if (!weather || !weather.weather) return "Unknown";

    const temperature = weather?.main?.temp;

    if (temperature >= 30) {
      return "Beer";
    } else if (temperature >= 10 && temperature <= 20 && !weatherDescription.includes("rain")) {
      return "Wine";
    } else {
      const weatherDescription = (weather.weather[0]?.description?.toLowerCase() ?? "");

      if (weatherDescription.includes("rain")) {
        return "Makgeolli";
      } else {
        return "Soju";
      }
    }
  };

  const foodRecommendations = {
    makgeolli: ["파전", "수제비", "김치전", "도토리묵", "두부김치", "계란찜", "모둠 전", "김치찌개", "불고기"],
    soju: ["김치우동", "알탕", "회", "삼겹살", "소고기", "닭발", "곱창", "닭도리탕", "쭈꾸미"],
    wine: ["치즈", "과일", "파스타", "피자", "스테이크", "샐러드", "새우"],
    beer: ["튀김", "나초", "건어물", "피자", "편의점", "치킨", "핫윙", "멕시칸 타코", "소세지", "나초와 팝콘","치킨위드라이스"],
  };  

  const handleRecommendationButtonClick = () => {
    if (selectedDrink) {
      const foodList = foodRecommendations[selectedDrink.toLowerCase()] || [];
      const randomIndex = Math.floor(Math.random() * foodList.length);
      const recommendation = foodList[randomIndex] || "No recommendation available.";
      setFoodRecommendation(recommendation);
    }
  };

  const temperature = weather?.main?.temp;
  const weatherDescription = weather?.weather?.[0]?.description;
  const weatherIcon = getWeatherIcon(weatherDescription);

  
//더알아보기
  const history = useHistory();
  const handleLearnMoreClick = () => {
    history.push('/learn-more');
  };

  

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <AppBar position="fixed">
          <Toolbar>
            <div className="flex-1"></div>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <span className="font-bold">달력</span>
            </Link>
            <div className="flex-1"></div>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" align="center">
                  Drink Recommendation
                </Typography>
                <Typography variant="h7" component="div" align="center">
                  Weather: {weatherDescription}
                  Temperature: {temperature}°C
                </Typography>
                <Typography variant="body1" align="center">
                  <FontAwesomeIcon icon={weatherIcon} size="2x" />
                </Typography>
                {recommendationType === "drink" && (
                  <div>
                    <Typography variant="h6" align="center">
                      Today's Drink Recommendation:
                    </Typography>
                    <Typography variant="h4" align="center" style={{ marginBottom: "20px" }}>
                      {getDrinkRecommendationByWeather()}
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" align="center">
                  Food Recommendation
                </Typography>
                <Typography variant="body1" align="center" style={{ marginBottom: "20px" }}>
                  {foodRecommendation}
                </Typography>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {drinkOptions.map((option) => (
                    <div
                      key={option.name}
                      onClick={() => handleDrinkSelection(option.name)}
                      style={selectedDrink === option.name ? { ...drinkIconStyle, ...selectedDrinkStyle } : drinkIconStyle}
                    >
                      <img src={option.icon} alt={option.name} style={{ width: "50px", height: "50px" }} />
                    </div>
                  ))}
                </div>
                {selectedDrink && (
                  <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" onClick={handleRecommendationButtonClick}>
                      Get New Recommendation
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
            {/* 새로운 카드 캐러셀 섹션 */}
            <Grid container spacing={1} justifyContent="center" style={{ marginTop: "20px" }}>
            {/* 각각의 카드에 대해 이 블록을 반복합니다. */}
            <Grid item xs={12} sm={6} md={4}>
              <RecipeReviewCard />
            </Grid>
            {/* 각각의 카드에 대해 이 블록을 반복합니다. */}
            </Grid>
            <Button onClick={handleLearnMoreClick} color="primary">
              더 알아보기
            </Button>
        </Grid>
        

      


      </div>
    </ThemeProvider>
  );
};

export default DrinkRecommendation;