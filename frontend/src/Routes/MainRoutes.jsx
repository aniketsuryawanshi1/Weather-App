import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import WeatherData from "../Pages/WeatherData";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather-data" element={<WeatherData />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
