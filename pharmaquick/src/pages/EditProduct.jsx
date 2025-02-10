import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";

const EditProduct = () => {
  const { productId } = useParams(); // Get productId from URL
  const navigate = useNavigate();
  const vendorId = sessionStorage.getItem('userid');

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    quantity: "",
    expiryDate: "",
    manufactureDate: "",
    category: "",
    description: "",
    images: [],
  });

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://localhost:44301/api/vendor/product/${productId}`, { withCredentials: true });
        const data = response.data;

        // Prefill form with existing product details
        setProduct({
          productName: data.productName || "",
          price: data.price || "",
          quantity: data.quantity || "",
          expiryDate: data.expiryDate ? data.expiryDate.split("T")[0] : "",
          manufactureDate: data.manufactureDate ? data.manufactureDate.split("T")[0] : "",
          category: data.category || "",
          description: data.description || "",
          images: data.images || [],
        });
      } catch (error) {
        console.error("Error fetching product details:", error.response?.data || error.message);
      }
    };

    fetchProduct();
  }, [productId]); // Dependency on productId

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle file changes (for images)
  const handleFileChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: Array.from(e.target.files),
    }));
  };

  // Handle form submission (update product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form fields to FormData
    formData.append("vendorId", vendorId);
    formData.append("productName", product.productName);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("expiryDate", product.expiryDate);
    formData.append("manufactureDate", product.manufactureDate);
    formData.append("category", product.category);
    formData.append("description", product.description);

    // Append images to FormData
    product.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch(`https://localhost:44301/api/vendor/edit-product/${productId}`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        alert("Product updated successfully");
        navigate("/my-products"); // Redirect to the products list page after update
      } else {
        alert("Error updating product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium mb-2" htmlFor="productName">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="p-2 border rounded"
            required
            readOnly
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-2" htmlFor="expiryDate">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={product.expiryDate}
            onChange={handleChange}
            className="p-2 border rounded"
            required
            readOnly
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-2" htmlFor="manufactureDate">
            Manufacture Date
          </label>
          <input
            type="date"
            id="manufactureDate"
            name="manufactureDate"
            value={product.manufactureDate}
            onChange={handleChange}
            className="p-2 border rounded"
            required
            readOnly
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-2" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="p-2 border rounded"
            required
            readOnly
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-2" htmlFor="images">
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Save Changes
          </button>
          <button type="button" onClick={() => navigate("/my-products")} className="bg-gray-500 text-white py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
