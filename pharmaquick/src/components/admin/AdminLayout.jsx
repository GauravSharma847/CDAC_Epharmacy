import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-flex vh-100">
      <div className="bg-light text-dark p-4" style={{ width: "250px" }}>
        <h4 className="mb-4">Admin Panel</h4>
        <a href="/admin/admin-management" className="btn btn-secondary w-100 mb-3">Admin Management</a>
        <a href="/admin/customers" className="btn btn-secondary w-100 mb-3">Customers</a>
        <a href="/admin/transactions" className="btn btn-secondary w-100 mb-3">Transactions</a>
        <a href="/admin/vendors" className="btn btn-secondary w-100 mb-3">Vendors</a>
        <a href="/admin/network-traffic" className="btn btn-secondary w-100">Network Traffic</a>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
