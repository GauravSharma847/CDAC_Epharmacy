import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* <Sidebar /> */}

      

      <div className="content flex-grow-1">
        {/* <Navbar /> */}
        <div className="container mt-3">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
