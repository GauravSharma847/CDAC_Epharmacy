import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setUserRole }) => {
    const [currentState, setCurrentState] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [userType, setUserType] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:44301/api/auth/login', { email, password });
            setUserRole(response.data.role);
            sessionStorage.setItem('userRole', response.data.role);
            sessionStorage.setItem('userName', response.data.userName);
            sessionStorage.setItem('userLoc', response.data.userLoc);
            sessionStorage.setItem('userEmail', response.data.userEmail);
            sessionStorage.setItem('userid', response.data.userid);

            // Show success toast
            toast.success(`Welcome back, ${response.data.userName}!`);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
            toast.error('Login failed! Please try again.');
        }
    };

    const onSignUpSubmit = async (e) => {
        e.preventDefault();
        const userDetails = { name, email, password, location, userType };
        try {
            const response = await axios.post('https://localhost:44301/api/auth/register', userDetails);
            if (response.status === 200) {
                setUserRole(response.data.role);
                toast.success('Account created successfully!');
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
            toast.error('Sign-up failed! Please try again.');
        }
    };

    const toggleState = () => {
        setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login');
    };

    return (
        <>
            <form
                onSubmit={currentState === 'Login' ? onLoginSubmit : onSignUpSubmit}
                className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
            >
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <p className='prata-regular text-3xl'>{currentState}</p>
                    <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
                </div>

                {currentState === 'Sign Up' && (
                    <input
                        className='w-full px-3 py-2 border border-gray-800'
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}

                <input
                    className='w-full px-3 py-2 border border-gray-800'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className='w-full px-3 py-2 border border-gray-800'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {currentState === 'Sign Up' && (
                    <>
                        <input
                            className='w-full px-3 py-2 border border-gray-800'
                            type='text'
                            placeholder='Location'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                        <select
                            className='w-full px-3 py-2 border border-gray-800 bg-white'
                            required
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="">Select User Type</option>
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                        </select>
                    </>
                )}

                {error && <p className='text-red-500'>{error}</p>}

                <div className='w-full flex justify-between text-sm mt-[-8px]'>
                    <p onClick={toggleState} className='cursor-pointer'>
                        {currentState === 'Login' ? 'Create account' : 'Login here'}
                    </p>
                </div>

                <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>
                    {currentState === 'Login' ? 'Sign in' : 'Sign up'}
                </button>
            </form>

            {/* Toast Container */}
            <ToastContainer />
        </>
    );
};

export default Login;
