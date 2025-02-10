

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from "react-toastify";

const PlaceOrder = () => {
    const [method, setMethod] = useState('razorpay');
    const { cartItems, currency, delivery_fee, getCartAmount, placeOrder } = useContext(ShopContext);
    const navigate = useNavigate();
    
    const [orderError, setOrderError] = useState("");
    const [orderSuccess, setOrderSuccess] = useState("");
    
    const totalAmount = getCartAmount() + delivery_fee;

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        state: ''
    });

    useEffect(() => {
        if (!document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Validate user input
    const validateUserData = () => {
        if (!userData.name || !userData.email || !userData.phone || !userData.address || !userData.city || !userData.zipCode || !userData.state) {
            setOrderError("All fields are required!");
            return false;
        }
        if (!/^[6-9]\d{9}$/.test(userData.phone)) {
            setOrderError("Enter a valid 10-digit phone number!");
            return false;
        }
        if (!/^\d{6}$/.test(userData.zipCode)) {
            setOrderError("Enter a valid 6-digit zip code!");
            return false;
        }
        return true;
    };

    // Handle Payment
    const handlePayment = async () => {
        if (Object.keys(cartItems).length === 0) {
            setOrderError("No orders to be placed!");
            return;
        }

        if (!validateUserData()) return;

        setOrderError("");
        setOrderSuccess("");

        if (method === 'razorpay') {
            const options = {
                key: 'rzp_test_TC0NB4puga4NUu',
                amount: totalAmount * 100,
                currency: 'INR',
                name: 'Your Store',
                description: 'Order Payment',
                image: assets.logo,
                handler: function (response) {
                    placeOrder(userData);  // Store the order with delivery info
                    toast.success("Payment Successful!");
                    navigate('/orders');
                },
                prefill: {
                    name: userData.name,
                    email: userData.email,
                    contact: userData.phone
                },
                theme: { color: '#3399cc' }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } else {
            placeOrder(userData);  // Store the order for COD
            setOrderSuccess("Order Placed Successfully!");
            toast.success("Order Placed Successfully!");
            setTimeout(() => {
                navigate('/orders');
            }, 2000);
        }
    };

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <input name='name' value={userData.name} onChange={handleInputChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Full Name' />
                <input name='email' value={userData.email} onChange={handleInputChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address' />
                <input name='phone' value={userData.phone} onChange={handleInputChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Phone' />
                <input name='address' value={userData.address} onChange={handleInputChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street Address' />
                <input name='city' value={userData.city} onChange={handleInputChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
                <input name='zipCode' value={userData.zipCode} onChange={handleInputChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Zip Code' />
                <input name='state' value={userData.state} onChange={handleInputChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
            </div>

            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                    <p className='mt-4 text-xl font-semibold'>Total Amount: {currency}{totalAmount}</p>
                </div>
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt='Razorpay' />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className=' text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button 
                            onClick={handlePayment} 
                            className={`px-16 py-3 text-sm ${Object.keys(cartItems).length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white'}`}
                            disabled={Object.keys(cartItems).length === 0}
                        >
                            PLACE ORDER
                        </button>

                        {orderError && <p className='text-red-500 text-center mt-4'>{orderError}</p>}
                        {orderSuccess && <p className='text-green-500 text-center mt-4'>{orderSuccess}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;