import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, currency, navigate, cartItems, updateQuantity } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const routerNavigate = useNavigate();

  useEffect(() => {
    // Retrieve user session
    const userSession = sessionStorage.getItem('userRole');
    if (!userSession || userSession !== 'Customer') {
      toast.error('Unauthorized access! Redirecting to Home page.');
      routerNavigate('/');
      return;
    }
  }, [routerNavigate]);

  useEffect(() => {
    const tempData = []
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartData.length === 0) {
      // Trigger a toast notification when the cart is empty
      toast.error("Your cart is empty!");
      return;
    }
    localStorage.setItem("cartData", JSON.stringify(cartData)); // Store cart items in localStorage
    navigate('/place-order'); // Navigate to place order page
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input 
                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                type="number" 
                min={1} 
                defaultValue={item.quantity} 
              />
              <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={handleCheckout} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

      {/* Toast Container for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default Cart;
