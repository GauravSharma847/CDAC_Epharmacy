import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Vendor = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    quantity: '',
    manufactureDate: '',
    expiryDate: '',
    category: '',
    description: '',
    bestSeller: 'false',
    images: []
  });
  const [loading, setLoading] = useState(false);  // For fetch loading state
  const [submitLoading, setSubmitLoading] = useState(false); // For submit loading state
  const [error, setError] = useState('');  // For showing validation error message

  const vendorId = sessionStorage.getItem('userid');

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44301/imageHub")  // Adjust to the actual SignalR Hub URL
      .configureLogging(signalR.LogLevel.Information)
      .build();
  
    // Start the connection when the component mounts
    connection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('SignalR Connection Error: ', err));
  
    // Handle the 'ReceiveUploadNotification' event
    connection.on('ReceiveUploadNotification', (message) => {
      toast.update(message);  // Display the notification message
    });
  
    // Cleanup when the component unmounts
    return () => {
      if (connection) {
        connection.stop();  // Stop the connection on unmount
      }
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  

  // Logout function
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login'; // This will reload the page and navigate to the login URL
  };

  // Fetch vendor products
  const fetchVendorProducts = async () => {
    if (loading) return;  // Prevent multiple requests while loading
    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:44301/api/vendor/products?vendorId=${vendorId}`, { withCredentials: true });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === "file" ? files : value
    }));
  };

  // Product validation function to check if the expiry date is less than 6 months from manufacture date
  const validateProductData = () => {
    const manufactureDate = new Date(productData.manufactureDate);
    const expiryDate = new Date(productData.expiryDate);
    const sixMonthsLater = new Date(manufactureDate);
    sixMonthsLater.setMonth(manufactureDate.getMonth() + 6);  // Adding 6 months to manufacture date

    if (expiryDate < sixMonthsLater) {
      setError('Expiry date cannot be more than 6 months after the manufacture date.');
      return false;
    }

    setError('');  // Clear error if validation passes
    return true;
  };

  // Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateProductData()) {
      return; // Stop form submission if validation fails
    }

    setSubmitLoading(true); // Disable button during request

    // Get the user role from session storage
    const userRole = sessionStorage.getItem('userRole');
    if (userRole !== 'Vendor') {
      alert('You do not have permission to add products. Please login as a vendor.');
      navigate('/login');
      return;
    }

    if (!vendorId) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append("VendorId", vendorId);
    formData.append("ProductName", productData.productName);
    formData.append("Price", productData.price);
    formData.append("Quantity", productData.quantity);
    formData.append("ManufactureDate", productData.manufactureDate);
    formData.append("ExpiryDate", productData.expiryDate);
    formData.append("Category", productData.category);
    formData.append("Description", productData.description);
    formData.append("BestSeller", productData.bestSeller);

    if (productData.images && productData.images.length > 0) {
      Array.from(productData.images).forEach((image) => {
        formData.append("Images", image); // Append image(s) to formData
      });
    }

    try {
      await axios.post(
        "https://localhost:44301/api/vendor/add-product",
        formData,
        {
          withCredentials: true,  // Send session cookie with the request
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      alert("Product added successfully!");
      fetchVendorProducts(); // Fetch the products after adding the new one
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    } finally {
      setSubmitLoading(false); // Re-enable the button after request completes
    }
  };

  // Remove a product
  const handleRemove = async (productId) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this product?");
    if (!confirmRemove) return;

    setLoading(true); // Set loading state while removing product
    try {
      await axios.delete(`https://localhost:44301/api/vendor/remove-product/${productId}?vendorId=${vendorId}`, {
        withCredentials: true,
      });
      fetchVendorProducts();
      alert("Product removed successfully!");
    } catch (error) {
      console.error("Error removing product:", error.response?.data || error.message);
      alert("An error occurred while removing the product.");
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

  useEffect(() => {
    fetchVendorProducts();
  }, []);

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        {/* Navbar */}
        <nav className="flex justify-between bg-gray-700 p-4 rounded-lg mb-6">
          <div className="text-white text-xl">Vendor Panel</div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded">
            Logout
          </button>
        </nav>

        {/* Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Show error if validation fails */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={productData.productName}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
              required
            />
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={productData.quantity}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
              required
            />
            <input
              type="date"
              name="manufactureDate"
              value={productData.manufactureDate}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
              required
            />
            <input
              type="date"
              name="expiryDate"
              value={productData.expiryDate}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
              required
            />
            {/* Category Dropdown */}
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
              required
            >
              <option value="">Select Category</option>
              <option value="Men's Care">Men's Care</option>
              <option value="Women's Care">Women's Care</option>
              <option value="Child's Care">Child's Care</option>
              <option value="Pain Relief">Pain Relief</option>
              <option value="Vitamins">Vitamins</option>
              <option value="Proteins">Proteins</option>
              <option value="Medical Equipment's">Medical Equipment's</option>
            </select>
            <textarea
              name="description"
              placeholder="Description"
              value={productData.description}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
              required
            ></textarea>
            <select
              name="bestSeller"
              value={productData.bestSeller}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
            >
              <option value="false">Yes</option>
              <option value="true">No</option>
            </select>
            <button
              type="submit"
              className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-400"
              disabled={submitLoading}
            >
              {submitLoading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">My Products</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="p-2 border-b">Product Name</th>
                <th className="p-2 border-b">Price</th>
                <th className="p-2 border-b">Quantity</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.vendorProductId} className="hover:bg-gray-100">
                  <td className="p-2 border-b">{product.productName}</td>
                  <td className="p-2 border-b">{product.price}</td>
                  <td className="p-2 border-b">{product.quantity}</td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => navigate(`/vendor/edit-product/${product.vendorProductId}`)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(product.vendorProductId)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-400"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p>Loading products...</p>}
        </div>
      </div>
    </div>
  );
};

export default Vendor;
