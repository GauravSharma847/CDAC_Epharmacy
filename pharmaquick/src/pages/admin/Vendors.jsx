import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Vendors = () => {
  const [vendors, setVendors] = useState([]); // Ensure vendors is initialized as an array
  const navigate = useNavigate();

  // Fetch vendors data on component mount
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("https://localhost:44301/api/admin/vendors?page=1&pageSize=10", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        // Check if 'vendors' is available in the response and is an array
        if (Array.isArray(data.vendors)) {
          setVendors(data.vendors); // Access vendors array
        } else {
          console.error("Invalid data format received from API:", data);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  // Remove a vendor and make an API call to delete it from the backend
  const handleRemoveVendor = async (id) => {
    try {
      const response = await fetch(`https://localhost:44301/api/admin/remove-vendor/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove vendor from the local state
        setVendors(vendors.filter((vendor) => vendor.userId !== id));
      } else {
        alert("Failed to remove vendor");
      }
    } catch (error) {
      console.error("Error removing vendor:", error);
      alert("An error occurred while removing the vendor.");
    }
  };

  return (
    <div className="d-flex">
      <div className="container mt-4">
        <h2>Vendor Management</h2>
        {/* Vendors Table */}
        {vendors.length === 0 ? (
          <p>No vendors available.</p>
        ) : (
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
              {vendors.map((vendor) => (
                <tr key={vendor.userId}>
                  <td>{vendor.userId}</td>
                  <td>{vendor.name}</td>
                  <td>{vendor.email}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveVendor(vendor.userId)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Vendors;
