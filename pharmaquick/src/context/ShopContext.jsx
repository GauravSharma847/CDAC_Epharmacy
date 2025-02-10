

import React, { createContext, useState } from 'react';
import { products } from "../assets/assets"; // Importing products
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState([]); // Store placed orders separately
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const currency = '₹';
    const delivery_fee = 0;
    const navigate = useNavigate();

    // Add item to cart
    const addToCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
    };

    // Update quantity of an item
    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };

    // Get total cart count
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    };

    // Get total cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }
        }
        return totalAmount;
    };

    // Place order and store in orders
    const placeOrder = (userData) => {
        const orderedItems = Object.keys(cartItems)
            .flatMap(itemId =>
                Object.entries(cartItems[itemId]).map(([size, quantity]) => {
                    const product = products.find(p => p._id === itemId);
                    const estimatedDelivery = generateEstimatedDeliveryTime(); // Generate estimated delivery time
                    return {
                        ...product,
                        size,
                        quantity,
                        deliveryInfo: userData,
                        estimatedDelivery, // Add estimated delivery time
                        orderDate: formatDate(new Date()) // Add current order date in DD-MM-YYYY format
                    };
                })
            );
    
        setOrders([...orders, ...orderedItems]); // Store orders
        setCartItems({}); // Clear cart after placing order
    };
    
    // Function to generate estimated delivery time (current time + 1 to 4 hours)
    const generateEstimatedDeliveryTime = () => {
        const currentDate = new Date();
        const randomHours = Math.floor(Math.random() * 4) + 1; // Random number between 1 and 4
        currentDate.setHours(currentDate.getHours() + randomHours);
    
        // Format the time (e.g., "08:00 PM")
        return currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };
    
    // Function to format date as DD-MM-YYYY
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <ShopContext.Provider value={{
            currency,
            delivery_fee,
            products,
            navigate,
            search, setSearch,
            showSearch, setShowSearch,
            cartItems, setCartItems,
            orders, placeOrder,
            addToCart, updateQuantity,
            getCartCount, getCartAmount
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;