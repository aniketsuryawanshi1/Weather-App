// filepath: c:\Aniket\GitHub\Weather-App\frontend\src\Pages\WeatherData.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../store/slices/weatherSlice";

const WeatherData = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeatherData()); // Fetch weather data on page load
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Weather Data</h1>
      <section>
        <h2>Metadata</h2>
        <p>{data.metadata}</p>
      </section>
      <section>
        <h3>Monthly Data</h3>
        <ul>
          {data.monthly_data.map((item, index) => (
            <li key={index}>
              {item.month} {item.year} - {item.region} | {item.parameter}:{" "}
              {item.value}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Seasonal Data</h3>
        <ul>
          {data.seasonal_data.map((item, index) => (
            <li key={index}>
              {item.season} {item.year} - {item.region} | {item.parameter}:{" "}
              {item.value}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Annual Data</h3>
        <ul>
          {data.annual_data.map((item, index) => (
            <li key={index}>
              {item.year} - {item.region} | {item.parameter}:{" "}
              {item.annual_value}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default WeatherData;
