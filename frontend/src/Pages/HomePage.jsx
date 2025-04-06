import React from "react";
import { Card, Row, Col, Typography } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import WeatherForm from "../components/WeatherForm";
import useWeatherApp from "../hooks/useWeatherApp";

const { Title, Text } = Typography;

const HomePage = () => {
  const { data, error } = useWeatherApp();

  const renderMetadata = () => (
    <Card
      title="🔹 Metadata"
      style={{
        marginTop: 16,
        background: "#f0f5ff",
        borderRadius: 16,
      }}
    >
      {data.metadata
        ? data.metadata.split("\n").map((line, index) => (
            <Text key={index} style={{ display: "block", marginBottom: 8 }}>
              - {line}
            </Text>
          ))
        : "No metadata available."}
    </Card>
  );

  const renderYearlyData = () =>
    data.annual_data.map((entry, index) => (
      <Card
        key={index}
        title={`🗓 Year: ${entry.year}`}
        style={{
          marginTop: 16,
          borderRadius: 16,
          background: "linear-gradient(to right, #e0f7fa, #e1f5fe)",
        }}
      >
        <Text strong>📆 Monthly Avg (°C):</Text>
        <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
          {Object.entries(entry.monthly).map(([month, value]) => (
            <Col span={6} key={month}>
              <Text>
                {month}: {value}°C
              </Text>
            </Col>
          ))}
        </Row>

        <Text strong style={{ display: "block", marginTop: 16 }}>
          📊 Seasonal & Annual Avg (°C):
        </Text>
        <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
          {Object.entries(entry.seasonal).map(([season, value]) => (
            <Col span={6} key={season}>
              <Text>
                {season}: {value !== null ? `${value}°C` : "---°C"}
              </Text>
            </Col>
          ))}
        </Row>
      </Card>
    ));

  const chartData = data.monthly_data.map((entry) => ({
    month: entry.month,
    value: entry.value,
  }));

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         padding: 32,
  //         textAlign: "center",
  //         background: "linear-gradient(to bottom right, #f0f2f5, #ffffff)",
  //         minHeight: "100vh",
  //       }}
  //     >
  //       <Title level={3}>Loading weather data...</Title>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div
        style={{
          padding: 32,
          textAlign: "center",
          background: "linear-gradient(to bottom right, #f0f2f5, #ffffff)",
          minHeight: "100vh",
        }}
      >
        <Title level={3} style={{ color: "red" }}>
          {error}
        </Title>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 32,
        background: "linear-gradient(to bottom right, #f0f2f5, #ffffff)",
        minHeight: "100vh",
      }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        🌤 Weather Data Dashboard
      </Title>

      {/* Weather Form */}
      <WeatherForm />

      {/* Weather Data Display */}
      <Card
        title={`📍 Weather Data Summary`}
        style={{
          borderRadius: 16,
          marginTop: 24,
          background: "linear-gradient(to right, #e1f5fe, #ffffff)",
        }}
      >
        {renderMetadata()}
        {renderYearlyData()}
        <Card
          title="📈 Monthly Avg Chart"
          style={{ marginTop: 24, borderRadius: 16 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis unit="°C" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1890ff"
                fill="#91d5ff"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </Card>
    </div>
  );
};

export default HomePage;
