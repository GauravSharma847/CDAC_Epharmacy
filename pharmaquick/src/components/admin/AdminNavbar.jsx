import React from "react";
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <Link className="navbar-brand" to="/admin-dashboard">
        <img src="/logo.png" alt="Logo" width="150" height="50" className="d-inline-block align-top" />
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" >
        <ul className="navbar-nav">
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
            <Link className="nav-link" to="/admin-management">Admins</Link>  {/* ✅ Added Admins Button */}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/network-traffic">Network Traffic</Link>
          </li>
        </ul>

        {/* ✅ Move Logout Button to the Right */}
        <button className="btn btn-danger ms-auto">Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
