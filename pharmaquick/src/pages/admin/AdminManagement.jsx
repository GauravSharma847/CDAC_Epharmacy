import React, { useState, useEffect } from "react";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "", location: "" });

  // Fetch admins when the component mounts
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("https://localhost:44301/api/admin/get-admins");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Admins:", data);
        setAdmins(data || []);
      } catch (error) {
        console.error("Error fetching admins:", error);
        alert("An error occurred while fetching admins.");
      }
    };

    fetchAdmins();
  }, []);

  const handleAddAdmin = async () => {
    if (newAdmin.name && newAdmin.email && newAdmin.password && newAdmin.location) {
      try {
        const response = await fetch("https://localhost:44301/api/admin/add-admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newAdmin, userType: "Admin" }),
        });

        if (response.ok) {
          const addedAdmin = await response.json();
          console.log("Added Admin:", addedAdmin);

          // Assuming addedAdmin contains the newAdminId and other fields
          setAdmins([...admins, { userId: addedAdmin.newAdminId, ...newAdmin }]);
          setNewAdmin({ name: "", email: "", password: "", location: "" });
        } else {
          alert("Failed to add admin");
        }
      } catch (error) {
        console.error("Error adding admin:", error);
        alert("An error occurred while adding the admin.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      const response = await fetch(`https://localhost:44301/api/admin/delete-admin/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setAdmins(admins.filter((admin) => admin.userId !== id));
      } else {
        alert("Failed to remove admin");
      }
    } catch (error) {
      console.error("Error removing admin:", error);
      alert("An error occurred while removing the admin.");
    }
  };

  return (
    <div className="d-flex">
      <div className="container mt-4">
        <h2>Admin Management</h2>

        {/* Add Admin Form */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Admin Name"
            className="form-control mb-2"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-2"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
          />
          <input
            type="email"
            placeholder="Admin Email"
            className="form-control mb-2"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="form-control mb-2"
            value={newAdmin.location}
            onChange={(e) => setNewAdmin({ ...newAdmin, location: e.target.value })}
          />
          <button className="btn btn-primary" onClick={handleAddAdmin}>
            Add Admin
          </button>
        </div>

        {/* Admins Table */}
        <table className="table table-bordered mt-3">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin.userId}>
                  <td>{admin.userId}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveAdmin(admin.userId)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No admins available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
