import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "../../axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

Chart.register(...registerables);

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [vendorData, setVendorData] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [transactionData, setTransactionData] = useState({});
  const [networkTrafficData, setNetworkTrafficData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for vendors, customers, transactions, and analytics
        const vendorResponse = await axios.get("/api/vendors");
        const customerResponse = await axios.get("/api/customers");
        const transactionResponse = await axios.get("/api/transactions");
        const analyticsResponse = await axios.get("/api/analytics");

        // Set data for rendering
        setVendors(vendorResponse.data);
        setCustomers(customerResponse.data);
        setTransactions(transactionResponse.data);
        setAnalytics(analyticsResponse.data);

        // Prepare chart data
        setVendorData({
          labels: vendorResponse.data.map((vendor) => vendor.name),
          datasets: [{
            label: "New Vendors",
            data: vendorResponse.data.map((vendor) => vendor.salesCount),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          }],
        });

        setCustomerData({
          labels: customerResponse.data.map((customer) => customer.name),
          datasets: [{
            label: "New Customers",
            data: customerResponse.data.map((customer) => customer.salesCount),
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          }],
        });

        setTransactionData({
          labels: transactionResponse.data.map((transaction) => transaction.productName),
          datasets: [{
            label: "Transactions Count",
            data: transactionResponse.data.map((transaction) => transaction.transactionCount),
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          }],
        });

        setNetworkTrafficData({
          labels: ["Visitors", "Clicks", "Other Activity"],
          datasets: [{
            label: "Network Traffic",
            data: [
              analyticsResponse.data.visitors,
              analyticsResponse.data.clicks,
              analyticsResponse.data.otherActivity,
            ],
            backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {/* Render charts and data */}
      <div className="row">
        <div className="col-md-6">
          <h4>Vendors</h4>
          <Bar data={vendorData} />
        </div>
        <div className="col-md-6">
          <h4>Customers</h4>
          <Bar data={customerData} />
        </div>
        <div className="col-md-6">
          <h4>Transactions</h4>
          <Bar data={transactionData} />
        </div>
        <div className="col-md-6">
          <h4>Network Traffic</h4>
          <Doughnut data={networkTrafficData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
