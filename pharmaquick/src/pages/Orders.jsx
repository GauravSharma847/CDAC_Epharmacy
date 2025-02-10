import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify'; // Notification library

const Orders = () => {
    const { orders, currency } = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Session validation for customer role
        const userSession = sessionStorage.getItem('userRole');
        if (!userSession || userSession !== 'Customer') {
            toast.error('Unauthorized access! Redirecting to Home page.');
            navigate('/');
            return;
        }
    }, [navigate]);

    const handleTrackOrder = (order) => {
        const totalAmount = order.price * order.quantity; // Calculate total amount for the product

        const trackingDetails = {
            id: order._id || Math.floor(Math.random() * 1000000), // Use order ID or generate a random one
            name: order.name,
            price: order.price,
            quantity: order.quantity,
            totalAmount: totalAmount, // Pass the total amount
            status: "Shipped",
            trackingNumber: `TRK-${Math.floor(Math.random() * 1000000)}`,
            estimatedDelivery: order.estimatedDelivery, // Use backend-estimated delivery time
            orderDate: order.orderDate, // Use backend order date
            deliveryInfo: order.deliveryInfo, // Additional delivery details
        };

        navigate(`/track-order/${trackingDetails.id}`, { state: { order: trackingDetails } });
    };

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {orders.length > 0 ? (
                    orders.map((item, index) => (
                        <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='flex items-start gap-6 text-sm'>
                                <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
                                <div>
                                    <p className='sm:text-base font-medium'>{item.name}</p>
                                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                        <p className='text-lg'>{currency}{item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Total: {currency}{item.price * item.quantity}</p>
                                    </div>
                                    <p className='mt-2'>Order Date: <span className='text-gray-400'>{item.orderDate}</span></p>
                                    <p className='mt-2'>Estimated Delivery: <span className='text-gray-400'>{item.estimatedDelivery}</span></p>
                                </div>
                            </div>
                            <div className='md:w-1/2 flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                    <p className='text-sm md:text-base'>Ready to ship</p>
                                </div>
                                <button
                                    className='border px-4 py-2 text-sm font-medium rounded-sm'
                                    onClick={() => handleTrackOrder(item)}
                                >
                                    Track Order
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center mt-6">No orders placed yet.</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
