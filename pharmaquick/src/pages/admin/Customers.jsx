import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  // Fetch customers from .NET backend
  useEffect(() => {
    fetch(`https://localhost:44301/api/admin/customers?page=1&pageSize=10`)
      .then(response => response.json())
      .then(data => setCustomers(data.customers || []))
      .catch(error => console.error("Error fetching customers:", error));
  }, []);

  // Remove customer (API call to .NET backend)
  const handleRemoveCustomer = (id) => {
    fetch(`https://localhost:44301/api/admin/remove-customer/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCustomers(customers.filter((customer) => customer.userId !== id));
        } else {
          console.error("Failed to remove customer");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="d-flex">
      <div className="container mt-4">
        <h2>Customer Management</h2>
        {/* Customers Table */}
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.userId}>
                <td>{customer.userId}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveCustomer(customer.userId)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
