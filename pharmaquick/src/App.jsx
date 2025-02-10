
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin Pages
import AdminManagement from './pages/admin/AdminManagement';
import AdminLayout from './components/admin/AdminLayout';
import Customers from './pages/admin/Customers';
import Transactions from './pages/admin/Transactions';
import Vendors from './pages/admin/Vendors';
import NetworkTraffic from './components/admin/NetworkTraffic';

// Vendor Pages
import VendorDashboard from './components/vendor/vendor-dashboard';

//Customer Pages
import CustomerDashboard from './components/CustomerProfile';

// Other Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Home from './pages/Home';
import Login from './pages/Login';
import EditProduct from './pages/EditProduct';
import Stocks from './pages/Stocks'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import TrackOrder from './pages/TrackOrder';


const App = () => {
  const [userRole, setUserRole] = useState(() => sessionStorage.getItem("userRole") || null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Current userRole:", userRole);

    if (userRole) {
      if (userRole === 'Vendor' && 
        !['/vendor/dashboard', '/about', '/contact', '/'].some(path => location.pathname.startsWith(path))) {

        navigate('/vendor/dashboard');
      } else if (userRole === 'Admin' && 
        !['/admin/admin-management', '/about', '/contact', '/'].some(path => location.pathname.startsWith(path))) {
        navigate('/admin/admin-management');
      } else if (userRole === 'Customer' && 
        !['/customer/profile', '/cart', '/place-order', '/orders', '/track-order','/collection','/'].some(path => location.pathname.startsWith(path))) {
        navigate('/customer/profile');
      }
    }
  }, [userRole, navigate, location.pathname]);

  const handleLogin = (role) => {
    setUserRole(role);
    sessionStorage.setItem("userRole", role);
  };

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />

      <main>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setUserRole={handleLogin} />} />
          <Route path="/vendor/edit-product/:productId" element={<EditProduct />} />
          <Route path='/collection' element={<Stocks />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path="/track-order/:orderId" element={<TrackOrder />} /> 



          {/* Protected Admin Routes */}
          {userRole === 'Admin' && (
            <Route path='/admin/*' element={<AdminLayout />}>
              <Route path='admin-management' element={<AdminManagement />} />
              <Route path='customers' element={<Customers />} />
              <Route path='transactions' element={<Transactions />} />
              <Route path='vendors' element={<Vendors />} />
              <Route path='network-traffic' element={<NetworkTraffic />} />
            </Route>
          )}

          {/* Protected Vendor Routes */}
          {userRole === 'Vendor' && (
            <Route path='/vendor/*' element={<VendorDashboard />}>
              <Route path="vendor/edit/:productId" element={<EditProduct />} />
            </Route>
          )}

          {/* Protected Customer Routes */}
          {userRole === 'Customer' && (
            <Route path='/customer/*' element={<CustomerDashboard />}>
            </Route>
          )}
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
