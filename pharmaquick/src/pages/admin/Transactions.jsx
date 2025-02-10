import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:44301/api/admin/transactions") // Update with actual API URL
      .then((response) => {
        console.log("Transactions Response:", response.data); // Log the response data for debugging
        if (response.data && Array.isArray(response.data.transactions)) {
          setTransactions(response.data.transactions);
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="d-flex">
      <div className="container mt-4">
        <h2>Transactions</h2>

        {loading && <p>Loading transactions...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && transactions.length === 0 && (
          <p>No transactions found.</p>
        )}

        {!loading && !error && transactions.length > 0 && (
          <table className="table table-bordered mt-3">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Amount (₹)</th>
                <th>Order ID</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index}>
                  <td>{txn.id || "N/A"}</td>
                  <td>{txn.userId || "N/A"}</td>
                  <td>₹{txn.amount ? txn.amount.toFixed(2) : "0.00"}</td>
                  <td>{txn.orderId || "N/A"}</td>
                  <td>{txn.status || "N/A"}</td>
                  <td>{txn.createdAt ? new Date(txn.createdAt).toLocaleDateString() : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transactions;
