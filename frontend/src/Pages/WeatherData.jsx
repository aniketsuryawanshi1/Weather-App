import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../store/slices/weatherSlice";
import { Card, Row, Col, Typography } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Text } = Typography;

const WeatherData = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const sortByMonth = (arr) =>
    [...arr].sort((a, b) => {
      const aMonth =
        a.month.slice(0, 3).charAt(0).toUpperCase() +
        a.month.slice(1, 3).toLowerCase();
      const bMonth =
        b.month.slice(0, 3).charAt(0).toUpperCase() +
        b.month.slice(1, 3).toLowerCase();
      return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
    });

  const renderMetadata = () => (
    <Card
      title="🔹 Metadata"
      style={{
        marginTop: 16,
        background: "#f0f5ff",
        borderRadius: 16,
      }}
    >
      {data.metadata?.split("\n").map((line, index) => (
        <Text key={index} style={{ display: "block", marginBottom: 8 }}>
          - {line}
        </Text>
      ))}
    </Card>
  );

  const renderYearlyData = () =>
    data.annual_data?.map((item, index) => {
      const monthlyForYear = sortByMonth(
        data.monthly_data?.filter((m) => m.year === item.year) || []
      );
      const seasonalForYear =
        data.seasonal_data?.filter((s) => s.year === item.year) || [];

      return (
        <Card
          key={index}
          title={`🗓 Year: ${item.year}`}
          style={{
            marginTop: 16,
            borderRadius: 16,
            background: "linear-gradient(to right, #e0f7fa, #e1f5fe)",
          }}
        >
          <Text strong>📆 Monthly Avg:</Text>
          <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
            {monthlyForYear.map((monthItem, idx) => (
              <Col span={6} key={idx}>
                <Text>
                  {monthItem.month}: {monthItem.value}
                  {monthItem.parameter === "Temperature" ? "°C" : ""}
                </Text>
              </Col>
            ))}
          </Row>

          <Text strong style={{ display: "block", marginTop: 16 }}>
            📊 Seasonal & Annual Avg:
          </Text>
          <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
            {seasonalForYear.map((sItem, idx) => (
              <Col span={6} key={idx}>
                <Text>
                  {sItem.season}:{" "}
                  {sItem.value !== null ? `${sItem.value}°C` : "---°C"}
                </Text>
              </Col>
            ))}
          </Row>
        </Card>
      );
    });

  const chartData = sortByMonth(
    data.monthly_data?.filter(
      (item) => item.year === data.annual_data?.[0]?.year
    ) || []
  ).map((item) => ({
    month: item.month,
    value: item.value,
  }));

  return (
    <div
      style={{
        padding: 32,
        background: "transparent",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <Card
          title={`📍 Weather Data Summary.`}
          style={{
            borderRadius: 16,
            marginTop: 24,
            background: "linear-gradient(to right, #e1f5fe, #ffffff)",
            width: "100%",
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
    </div>
  );
};

export default WeatherData;
