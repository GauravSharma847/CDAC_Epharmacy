import React from 'react';
import { useLocation } from 'react-router-dom';

const TrackOrder = () => {
    const location = useLocation();
    const { order } = location.state || {}; // Ensure data is received safely

    if (!order) {
        return (
            <div className="pt-16 px-6 text-center">
                <h2 className="text-2xl font-semibold text-red-500">Order not found!</h2>
                <p className="text-gray-600 mt-2">Please check your orders page and try again.</p>
            </div>
        );
    }

    return (
        <div className="pt-16 px-6">
            <h2 className="text-2xl font-semibold mb-4">Track Your Order #{order.id}</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p><strong>Status:</strong> <span className="text-blue-500">{order.status}</span></p>
                <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                <p><strong>Estimated Delivery:</strong> {order.estimatedDelivery}</p> {/* Display estimated delivery time */}
                <p><strong>Order Date:</strong> {order.orderDate}</p> {/* Display order date in DD-MM-YYYY format */}
                <p><strong>Product Name:</strong> {order.name}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Price per Item:</strong> ₹{order.price}</p>
                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Delivery Address:</strong> {order.deliveryInfo.address}, {order.deliveryInfo.city}, {order.deliveryInfo.state} - {order.deliveryInfo.zipCode}</p>
            </div>
        </div>
    );
};

export default TrackOrder;