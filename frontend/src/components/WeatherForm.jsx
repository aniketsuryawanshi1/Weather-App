import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  setFormData,
  fetchDropdownOptions,
  submitFormData,
} from "../store/slices/weatherSlice";

const WeatherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { dropdownOptions, formData, loading, error, message } = useSelector(
    (state) => state.weather
  );

  React.useEffect(() => {
    dispatch(fetchDropdownOptions());
  }, [dispatch]);

  const handleChange = (name, value) => {
    dispatch(setFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(submitFormData(formData));
    if (submitFormData.fulfilled.match(result)) {
      navigate("/weather-data"); // Redirect to /weather-data on success
    }
  };

  return (
    <div>
      <h2>Fetch Weather Data</h2>
      <form onSubmit={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col>
            <Select
              placeholder="Select Region"
              value={formData.region}
              onChange={(value) => handleChange("region", value)}
              options={dropdownOptions.region_choices}
            />
          </Col>
          <Col>
            <Select
              placeholder="Select Parameter"
              value={formData.parameter}
              onChange={(value) => handleChange("parameter", value)}
              options={dropdownOptions.parameter_choices}
            />
          </Col>
          <Col>
            <Select
              placeholder="Select Year"
              value={formData.year}
              onChange={(value) => handleChange("year", value)}
              options={dropdownOptions.year_choices}
            />
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Col>
        </Row>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WeatherForm;
