import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: "250px", position: "fixed", top: "0", height: "100vh" }}>
      <h4 className="mb-4">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/admin-dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/vendors">Vendors</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/customers">Customers</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/transactions">Transactions</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/network-traffic">Network Traffic</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin-management">Admins</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
