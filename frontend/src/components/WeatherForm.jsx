import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Button, Row, Col, Typography } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  setFormData,
  fetchDropdownOptions,
  submitFormData,
} from "../store/slices/weatherSlice";

const { Title } = Typography;

const WeatherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/weather-data");
    }
  };

  const selectHeightStyle = {
    width: "100%",
    height: "50px",
    fontSize: "16px",
  };

  const commonSelectProps = {
    showSearch: true,
    filterOption: (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase()),
    style: selectHeightStyle,
    dropdownStyle: {
      fontSize: "16px",
    },
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        background: "linear-gradient(to right, #f0f8ff, #e0f7fa)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
          backgroundColor: "#fff",
          padding: 32,
          borderRadius: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", marginBottom: 32, color: "#00796b" }}
        >
          🌤 Fetch Weather Data
        </Title>

        <form onSubmit={handleSubmit}>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Select
                {...commonSelectProps}
                placeholder={
                  <span
                    style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: 500 }}
                  >
                    🌍 Select Region
                  </span>
                }
                value={formData.region || undefined}
                onChange={(value) => handleChange("region", value)}
                options={dropdownOptions.region_choices || []}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                {...commonSelectProps}
                placeholder={
                  <span
                    style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: 500 }}
                  >
                    📊 Select Parameter
                  </span>
                }
                value={formData.parameter || undefined}
                onChange={(value) => handleChange("parameter", value)}
                options={dropdownOptions.parameter_choices || []}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                {...commonSelectProps}
                placeholder={
                  <span
                    style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: 500 }}
                  >
                    📅 Select Year
                  </span>
                }
                value={formData.year || undefined}
                onChange={(value) => handleChange("year", value)}
                options={dropdownOptions.year_choices || []}
              />
            </Col>
          </Row>

          <Row justify="center" style={{ marginTop: 32 }}>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                icon={<CloudDownloadOutlined />}
                size="large"
                style={{
                  backgroundColor: "#00796b",
                  borderColor: "#00796b",
                  padding: "0 32px",
                  borderRadius: 8,
                }}
                loading={loading}
              >
                {loading ? "Submitting..." : "Fetch Data"}
              </Button>
            </Col>
          </Row>
        </form>

        {message && (
          <p style={{ color: "green", textAlign: "center", marginTop: 24 }}>
            {message}
          </p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: 24 }}>
            {error}
          </p>
        )}
      </div>
    </section>
  );
};

export default WeatherForm;
