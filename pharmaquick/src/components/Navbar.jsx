import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Importing the CSS for react-toastify

const Navbar = () => {
    const [visible, setVisble] = useState(false);
    const { setShowSearch, navigate, getCartCount } = useContext(ShopContext);

    // Get the user role and name from sessionStorage
    const userRole = sessionStorage.getItem('userRole');
    const userName = sessionStorage.getItem('userName'); // Assuming the user's name is stored in sessionStorage

    const handleProfileNavigation = () => {
        if (userRole === 'Admin') {
            navigate('/admin/admin-management');
        } else if (userRole === 'Vendor') {
            navigate('/vendor/vendor-dashboard');
        } else if (userRole === 'Customer') {
            navigate('/customer-profile');
        } else {
            navigate('/login');
        }
    };

    // Logout handler
    const handleLogout = () => {
        // Clear sessionStorage
        sessionStorage.clear();
        localStorage.clear();

        // Display a toast message
        toast.success('Logged out successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        // Force a page reload to navigate to login
        window.location.href = '/login'; // This will reload the page and navigate to the login URL

       
    };
    const getDashboardLink = () => {
        switch (userRole) {
            case "Admin":
                return "/admin/admin-management";
            case "Vendor":
                return "/vendor/dashboard";
            case "Customer":
                return "/customer/profile";
            default:
                return "/"; // Redirect to home or login if role is undefined
        }
    };

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/' onClick={() => {
                sessionStorage.clear();
                localStorage.clear();
            }}>
                <img className='w-36' src={assets.logo} alt="Logo" />
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to="/" className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>INVENTORY</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={() => { setShowSearch(true); navigate('/collection') }} className='w-5 cursor-pointer' src={assets.search_icon} alt="Search" />
                <div className='group relative'>
                    <img onClick={handleProfileNavigation} className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile" />

                    {/* Dropdown Menu */}
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={handleLogout} className='cursor-pointer hover:text-black'>Logout</p> {/* Logout Button */}
                        </div>
                    </div>
                </div>

                {/* Display user's name if logged in */}
                {userName && (
                    <Link to={getDashboardLink()} className="text-sm font-medium text-gray-700 hover:underline">
                        {userName}
                    </Link>
                )}

                <Link to='/cart' className='relative'>
                    <img className='w-5 min-w-5' src={assets.cart_icon} alt="Cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisble(true)} className='w-5 cursor-pointer sm:hidden' src={assets.menu_icon} alt="Menu" />
            </div>

            {/* Sidebar Menu For Small Screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisble(false)} className='flex items-center gap-4 p-3 '>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Dropdown" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisble(false)} to="/" className='py-2 pl-6 border'>HOME</NavLink>
                    <NavLink onClick={() => setVisble(false)} to='/collection' className='py-2 pl-6 border'>INVENTORY</NavLink>
                    <NavLink onClick={() => setVisble(false)} to='/about' className='py-2 pl-6 border'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisble(false)} to='/contact' className='py-2 pl-6 border'>CONTACT</NavLink>
                </div>
            </div>

            {/* Toast Notification Container */}
            <ToastContainer />
        </div>
    );
}

export default Navbar;
