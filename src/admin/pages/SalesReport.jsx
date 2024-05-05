import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { DatePicker, Select } from "antd";
import styled from "styled-components";
import SalesReportD from "../components/SalesReportD";

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

const { RangePicker } = DatePicker;
const { Option } = Select;

const SalesReport = () => {
  const [salesData, setSalesData] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    fetchSalesData();
  }, [selectedMonth, selectedDateRange]);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/orders");
      let filteredOrders = response.data;

      // Filter by selected month
      if (selectedMonth) {
        const month = parseInt(selectedMonth);
        filteredOrders = response.data.filter((order) => {
          const orderMonth = new Date(order.createdAt).getMonth() + 1;
          return orderMonth === month;
        });
      }

      // Filter by selected date range
      if (selectedDateRange.length > 0) {
        filteredOrders = filteredOrders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate >= selectedDateRange[0].startOf("day") &&
            orderDate <= selectedDateRange[1].endOf("day")
          );
        });
      }

      const salesByDate = {};
      let totalPriceSum = 0;

      filteredOrders.forEach((order) => {
        const orderDate = new Date(order.createdAt);
        const formattedDate = formatDate(orderDate);

        if (salesByDate[formattedDate]) {
          salesByDate[formattedDate] += order.totalPrice;
        } else {
          salesByDate[formattedDate] = order.totalPrice;
        }

        totalPriceSum += order.totalPrice;
      });

      const datesArray = Object.keys(salesByDate);
      const salesAmounts = Object.values(salesByDate);

      setTotalPrice(totalPriceSum);
      setTotalOrders(filteredOrders.length);

      setSalesData({
        labels: datesArray,
        datasets: [
          {
            label: "Sales Amount",
            data: salesAmounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const formatDate = (date) => {
    const options = { month: "short", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleDateRangeChange = (dates) => {
    setSelectedDateRange(dates);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  return (
    <>
      <Container>
        <Header>
          <h2>Sales Report</h2>
          <Summary>
            <TotalPrice>Total Price (All Orders): ${totalPrice}</TotalPrice>
            <TotalOrders>Total Orders: {totalOrders}</TotalOrders>
            {selectedDateRange.length > 0 && (
              <Summary>
                <TotalPrice>
                  Total Price (Selected Range): $
                  {salesData.datasets[0].data.reduce(
                    (acc, curr) => acc + curr,
                    0,
                  )}
                </TotalPrice>
              </Summary>
            )}
          </Summary>
        </Header>
        <Filters>
          <RangePickerContainer>
            <RangePicker onChange={handleDateRangeChange} />
          </RangePickerContainer>
          <MonthPickerContainer>
            <Select
              placeholder="Select Month"
              style={{ width: 120 }}
              onChange={handleMonthChange}
            >
              <Option value="">All Months</Option>
              <Option value="1">January</Option>
              <Option value="2">February</Option>
              <Option value="3">March</Option>
              <Option value="4">April</Option>
              <Option value="5">May</Option>
              <Option value="6">June</Option>
              <Option value="7">July</Option>
              <Option value="8">August</Option>
              <Option value="9">September</Option>
              <Option value="10">October</Option>
              <Option value="11">November</Option>
              <Option value="12">December</Option>
            </Select>
          </MonthPickerContainer>
        </Filters>
        <ChartContainer>
          <Bar
            data={{
              labels: salesData.labels || [],
              datasets: salesData.datasets || [],
            }}
            options={{
              indexAxis: "x",
              scales: {
                x: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
                y: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Total Price",
                  },
                },
              },
            }}
          />
        </ChartContainer>
      </Container>
      <SalesReportD />
    </>
  );
};

const Container = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Summary = styled.div`
  display: flex;
`;

const TotalPrice = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
`;

const TotalOrders = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
`;

const RangePickerContainer = styled.div`
  margin-top: 20px;
  margin-right: 20px;
`;

const MonthPickerContainer = styled.div`
  margin-top: 20px;
`;

const ChartContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

export default SalesReport;
